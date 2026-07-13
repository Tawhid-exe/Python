// src/services/pyodide.ts
declare global {
  interface Window {
    loadPyodide: (config: { indexURL: string }) => Promise<any>;
  }
}

let pyodideInstance: any = null;
let isLoading = false;
const listeners: ((pyodide: any) => void)[] = [];

export async function initPyodide() {
  if (pyodideInstance) return pyodideInstance;
  if (isLoading) {
    return new Promise((resolve) => {
      listeners.push(resolve);
    });
  }
  
  isLoading = true;
  
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
  document.head.appendChild(script);

  await new Promise((resolve, reject) => {
    script.onload = resolve;
    script.onerror = () => reject(new Error('Failed to load Pyodide script'));
  });

  pyodideInstance = await window.loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
  });

  isLoading = false;
  listeners.forEach((resolve) => resolve(pyodideInstance));
  return pyodideInstance;
}

export async function runPython(code: string, inputs: string[] = []): Promise<{ success: boolean; output: string }> {
  try {
    const pyodide = await initPyodide();

    // Build a Python-native list literal — no JS interop needed, far more reliable
    const inputsLiteral = JSON.stringify(inputs.map(String));

    const setupCode = `
import sys
import io
import builtins

_sim_inputs = ${inputsLiteral}
_sim_idx = [0]

_stdout_buf = io.StringIO()
sys.stdout = _stdout_buf
sys.stderr = _stdout_buf

def _custom_input(prompt=""):
    if prompt:
        _stdout_buf.write(str(prompt))
    if _sim_idx[0] < len(_sim_inputs):
        val = str(_sim_inputs[_sim_idx[0]])
        _sim_idx[0] += 1
        _stdout_buf.write(val + "\\n")
        return val
    raise EOFError("No more simulated inputs provided for input(). Add more STDIN values.")

builtins.input = _custom_input
`;

    await pyodide.runPythonAsync(setupCode);
    await pyodide.runPythonAsync(code);

    const output = pyodide.runPython("_stdout_buf.getvalue()");
    return { success: true, output };
  } catch (error: any) {
    let partialOutput = "";
    if (pyodideInstance) {
      try { partialOutput = pyodideInstance.runPython("_stdout_buf.getvalue()"); } catch (e) { /* ignore */ }
    }
    return { success: false, output: (partialOutput ? partialOutput + "\n" : "") + error.message };
  }
}
