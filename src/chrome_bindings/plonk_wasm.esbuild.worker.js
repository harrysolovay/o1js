var __toBinary = /* @__PURE__ */ (() => {
  var table = new Uint8Array(128);
  for (var i = 0; i < 64; i++)
    table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i;
  return (base64) => {
    var n = base64.length, bytes = new Uint8Array((n - (base64[n - 1] == "=") - (base64[n - 2] == "=")) * 3 / 4 | 0);
    for (var i2 = 0, j = 0; i2 < n; ) {
      var c0 = table[base64.charCodeAt(i2++)], c1 = table[base64.charCodeAt(i2++)];
      var c2 = table[base64.charCodeAt(i2++)], c3 = table[base64.charCodeAt(i2++)];
      bytes[j++] = c0 << 2 | c1 >> 4;
      bytes[j++] = c1 << 4 | c2 >> 2;
      bytes[j++] = c2 << 6 | c3;
    }
    return bytes;
  };
})();

// src/chrome_bindings/snippets/wasm-bindgen-rayon-7afa899f36665473/src/workerHelpers.esbuild.js
function waitForMsgType(target, type) {
  return new Promise((resolve) => {
    target.addEventListener("message", function onMsg({ data }) {
      if (data == null || data.type !== type)
        return;
      target.removeEventListener("message", onMsg);
      resolve(data);
    });
  });
}
waitForMsgType(self, "wasm_bindgen_worker_init").then(async (data) => {
  await plonk_wasm_esbuild_default(data.module, data.memory);
  postMessage({ type: "wasm_bindgen_worker_ready" });
  wbg_rayon_start_worker(data.receiver);
});
var _workers;
async function startWorkers(module, memory, builder) {
  const workerInit = {
    type: "wasm_bindgen_worker_init",
    module,
    memory,
    receiver: builder.receiver(),
    mainJS: builder.mainJS()
  };
  _workers = await Promise.all(Array.from({ length: builder.numThreads() }, async () => {
    let scriptBlob = await fetch(CDN_LOCATION).then((r) => r.blob());
    let url = URL.createObjectURL(scriptBlob);
    const worker = new Worker(url, {
      type: "module"
    });
    worker.postMessage(workerInit);
    await waitForMsgType(worker, "wasm_bindgen_worker_ready");
    URL.revokeObjectURL(url);
    return worker;
  }));
  builder.build();
}

// src/chrome_bindings/plonk_wasm_bg.wasm

// src/chrome_bindings/plonk_wasm.esbuild.js
var CDN_LOCATION = "https://cdn.jsdelivr.net/gh/mitschabaude/snarkyjs@feature/restructure-web/src/chrome_bindings/plonk_wasm.esbuild.worker.js";
var wasm;
var cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
var cachegetUint8Memory0 = null;
function getUint8Memory0() {
  if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
    cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachegetUint8Memory0;
}
function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().slice(ptr, ptr + len));
}
var heap = new Array(32).fill(void 0);
heap.push(void 0, null, true, false);
var heap_next = heap.length;
function addHeapObject(obj) {
  if (heap_next === heap.length)
    heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];
  heap[idx] = obj;
  return idx;
}
function getObject(idx) {
  return heap[idx];
}
function dropObject(idx) {
  if (idx < 36)
    return;
  heap[idx] = heap_next;
  heap_next = idx;
}
function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}
var cachegetInt32Memory0 = null;
function getInt32Memory0() {
  if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
    cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachegetInt32Memory0;
}
function getArrayU8FromWasm0(ptr, len) {
  return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
var WASM_VECTOR_LEN = 0;
function passArray8ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 1);
  getUint8Memory0().set(arg, ptr / 1);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}
var cachegetUint32Memory0 = null;
function getUint32Memory0() {
  if (cachegetUint32Memory0 === null || cachegetUint32Memory0.buffer !== wasm.memory.buffer) {
    cachegetUint32Memory0 = new Uint32Array(wasm.memory.buffer);
  }
  return cachegetUint32Memory0;
}
function passArray32ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 4);
  getUint32Memory0().set(arg, ptr / 4);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}
function _assertClass(instance, klass) {
  if (!(instance instanceof klass)) {
    throw new Error(`expected instance of ${klass.name}`);
  }
  return instance.ptr;
}
function caml_pasta_fp_plonk_oracles_create(lgr_comm, index, proof) {
  var ptr0 = passArray32ToWasm0(lgr_comm, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  _assertClass(index, WasmPastaFpPlonkVerifierIndex);
  var ptr1 = index.ptr;
  index.ptr = 0;
  _assertClass(proof, WasmPastaFpProverProof);
  var ptr2 = proof.ptr;
  proof.ptr = 0;
  var ret = wasm.caml_pasta_fp_plonk_oracles_create(ptr0, len0, ptr1, ptr2);
  return WasmPastaFpPlonkOracles.__wrap(ret);
}
function caml_pasta_fp_plonk_oracles_dummy() {
  var ret = wasm.caml_pasta_fp_plonk_oracles_dummy();
  return WasmPastaFpPlonkOracles.__wrap(ret);
}
function caml_pasta_fp_plonk_oracles_deep_copy(x) {
  _assertClass(x, WasmPastaFpPlonkOracles);
  var ptr0 = x.ptr;
  x.ptr = 0;
  var ret = wasm.caml_pasta_fp_plonk_oracles_deep_copy(ptr0);
  return WasmPastaFpPlonkOracles.__wrap(ret);
}
function getArrayU32FromWasm0(ptr, len) {
  return getUint32Memory0().subarray(ptr / 4, ptr / 4 + len);
}
function caml_pasta_fp_plonk_proof_create(index, primary_input, auxiliary_input, prev_challenges, prev_sgs) {
  _assertClass(index, WasmPastaFpPlonkIndex);
  var ptr0 = passArray8ToWasm0(primary_input, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ptr1 = passArray8ToWasm0(auxiliary_input, wasm.__wbindgen_malloc);
  var len1 = WASM_VECTOR_LEN;
  var ptr2 = passArray8ToWasm0(prev_challenges, wasm.__wbindgen_malloc);
  var len2 = WASM_VECTOR_LEN;
  var ptr3 = passArray32ToWasm0(prev_sgs, wasm.__wbindgen_malloc);
  var len3 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fp_plonk_proof_create(index.ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
  return WasmPastaFpProverProof.__wrap(ret);
}
function caml_pasta_fp_plonk_proof_verify(lgr_comm, index, proof) {
  var ptr0 = passArray32ToWasm0(lgr_comm, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  _assertClass(index, WasmPastaFpPlonkVerifierIndex);
  var ptr1 = index.ptr;
  index.ptr = 0;
  _assertClass(proof, WasmPastaFpProverProof);
  var ptr2 = proof.ptr;
  proof.ptr = 0;
  var ret = wasm.caml_pasta_fp_plonk_proof_verify(ptr0, len0, ptr1, ptr2);
  return ret !== 0;
}
function caml_pasta_fp_plonk_proof_batch_verify(lgr_comms, indexes, proofs) {
  _assertClass(lgr_comms, WasmVecVecVestaPolyComm);
  var ptr0 = lgr_comms.ptr;
  lgr_comms.ptr = 0;
  var ptr1 = passArray32ToWasm0(indexes, wasm.__wbindgen_malloc);
  var len1 = WASM_VECTOR_LEN;
  var ptr2 = passArray32ToWasm0(proofs, wasm.__wbindgen_malloc);
  var len2 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fp_plonk_proof_batch_verify(ptr0, ptr1, len1, ptr2, len2);
  return ret !== 0;
}
function caml_pasta_fp_plonk_proof_dummy() {
  var ret = wasm.caml_pasta_fp_plonk_proof_dummy();
  return WasmPastaFpProverProof.__wrap(ret);
}
function caml_pasta_fp_plonk_proof_deep_copy(x) {
  _assertClass(x, WasmPastaFpProverProof);
  var ptr0 = x.ptr;
  x.ptr = 0;
  var ret = wasm.caml_pasta_fp_plonk_proof_deep_copy(ptr0);
  return WasmPastaFpProverProof.__wrap(ret);
}
function caml_pasta_fp_size_in_bits() {
  var ret = wasm.caml_pasta_fp_size_in_bits();
  return ret;
}
function caml_pasta_fp_size() {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_fp_size(retptr);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_add(x, y) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_add(retptr, ptr0, len0, ptr1, len1);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v2 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v2;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_sub(x, y) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_sub(retptr, ptr0, len0, ptr1, len1);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v2 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v2;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_negate(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_negate(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_mul(x, y) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_mul(retptr, ptr0, len0, ptr1, len1);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v2 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v2;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_div(x, y) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_div(retptr, ptr0, len0, ptr1, len1);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v2 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v2;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_inv(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_inv(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    let v1;
    if (r0 !== 0) {
      v1 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
    }
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_square(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_square(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_is_square(x) {
  var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fp_is_square(ptr0, len0);
  return ret !== 0;
}
function caml_pasta_fp_sqrt(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_sqrt(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    let v1;
    if (r0 !== 0) {
      v1 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
    }
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_of_int(i) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_fp_of_int(retptr, i);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_to_string(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_to_string(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    return getStringFromWasm0(r0, r1);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_free(r0, r1);
  }
}
var cachedTextEncoder = new TextEncoder("utf-8");
var encodeString = function(arg, view) {
  const buf = cachedTextEncoder.encode(arg);
  view.set(buf);
  return {
    read: arg.length,
    written: buf.length
  };
};
function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === void 0) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr2 = malloc(buf.length);
    getUint8Memory0().subarray(ptr2, ptr2 + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr2;
  }
  let len = arg.length;
  let ptr = malloc(len);
  const mem = getUint8Memory0();
  let offset = 0;
  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 127)
      break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3);
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);
    offset += ret.written;
  }
  WASM_VECTOR_LEN = offset;
  return ptr;
}
function caml_pasta_fp_of_string(s) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_of_string(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_print(x) {
  var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  wasm.caml_pasta_fp_print(ptr0, len0);
}
function caml_pasta_fp_compare(x, y) {
  var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
  var len1 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fp_compare(ptr0, len0, ptr1, len1);
  return ret;
}
function caml_pasta_fp_equal(x, y) {
  var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
  var len1 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fp_equal(ptr0, len0, ptr1, len1);
  return ret !== 0;
}
function caml_pasta_fp_random() {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_fp_random(retptr);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_rng(i) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_fp_rng(retptr, i);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_to_bigint(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_to_bigint(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_of_bigint(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_of_bigint(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_two_adic_root_of_unity() {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_fp_two_adic_root_of_unity(retptr);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_domain_generator(log2_size) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_fp_domain_generator(retptr, log2_size);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_to_bytes(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_to_bytes(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_of_bytes(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_of_bytes(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_deep_copy(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_deep_copy(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_size_in_bits() {
  var ret = wasm.caml_pasta_fp_size_in_bits();
  return ret;
}
function caml_pasta_fq_size() {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_fq_size(retptr);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_add(x, y) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_add(retptr, ptr0, len0, ptr1, len1);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v2 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v2;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_sub(x, y) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_sub(retptr, ptr0, len0, ptr1, len1);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v2 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v2;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_negate(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_negate(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_mul(x, y) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_mul(retptr, ptr0, len0, ptr1, len1);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v2 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v2;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_div(x, y) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_div(retptr, ptr0, len0, ptr1, len1);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v2 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v2;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_inv(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_inv(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    let v1;
    if (r0 !== 0) {
      v1 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
    }
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_square(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_square(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_is_square(x) {
  var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fq_is_square(ptr0, len0);
  return ret !== 0;
}
function caml_pasta_fq_sqrt(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_sqrt(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    let v1;
    if (r0 !== 0) {
      v1 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
    }
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_of_int(i) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_fq_of_int(retptr, i);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_to_string(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_to_string(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    return getStringFromWasm0(r0, r1);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_free(r0, r1);
  }
}
function caml_pasta_fq_of_string(s) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_of_string(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_print(x) {
  var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  wasm.caml_pasta_fq_print(ptr0, len0);
}
function caml_pasta_fq_compare(x, y) {
  var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
  var len1 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fq_compare(ptr0, len0, ptr1, len1);
  return ret;
}
function caml_pasta_fq_equal(x, y) {
  var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
  var len1 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fq_equal(ptr0, len0, ptr1, len1);
  return ret !== 0;
}
function caml_pasta_fq_random() {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_fq_random(retptr);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_rng(i) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_fq_rng(retptr, i);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_to_bigint(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_to_bigint(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_of_bigint(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_of_bigint(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_two_adic_root_of_unity() {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_fq_two_adic_root_of_unity(retptr);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_domain_generator(log2_size) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_fq_domain_generator(retptr, log2_size);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_to_bytes(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_to_bytes(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_of_bytes(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_of_bytes(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_deep_copy(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_deep_copy(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_plonk_oracles_create(lgr_comm, index, proof) {
  var ptr0 = passArray32ToWasm0(lgr_comm, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  _assertClass(index, WasmPastaFqPlonkVerifierIndex);
  var ptr1 = index.ptr;
  index.ptr = 0;
  _assertClass(proof, WasmPastaFqProverProof);
  var ptr2 = proof.ptr;
  proof.ptr = 0;
  var ret = wasm.caml_pasta_fq_plonk_oracles_create(ptr0, len0, ptr1, ptr2);
  return WasmPastaFqPlonkOracles.__wrap(ret);
}
function caml_pasta_fq_plonk_oracles_dummy() {
  var ret = wasm.caml_pasta_fq_plonk_oracles_dummy();
  return WasmPastaFqPlonkOracles.__wrap(ret);
}
function caml_pasta_fq_plonk_oracles_deep_copy(x) {
  _assertClass(x, WasmPastaFqPlonkOracles);
  var ptr0 = x.ptr;
  x.ptr = 0;
  var ret = wasm.caml_pasta_fq_plonk_oracles_deep_copy(ptr0);
  return WasmPastaFqPlonkOracles.__wrap(ret);
}
function isLikeNone(x) {
  return x === void 0 || x === null;
}
function caml_pasta_fp_plonk_verifier_index_read(offset, urs, path) {
  _assertClass(urs, WasmPastaFpUrs);
  var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fp_plonk_verifier_index_read(!isLikeNone(offset), isLikeNone(offset) ? 0 : offset, urs.ptr, ptr0, len0);
  return WasmPastaFpPlonkVerifierIndex.__wrap(ret);
}
function caml_pasta_fp_plonk_verifier_index_write(append, index, path) {
  _assertClass(index, WasmPastaFpPlonkVerifierIndex);
  var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  wasm.caml_pasta_fp_plonk_verifier_index_write(isLikeNone(append) ? 16777215 : append ? 1 : 0, index.ptr, ptr0, len0);
}
function caml_pasta_fp_plonk_verifier_index_create(index) {
  _assertClass(index, WasmPastaFpPlonkIndex);
  var ret = wasm.caml_pasta_fp_plonk_verifier_index_create(index.ptr);
  return WasmPastaFpPlonkVerifierIndex.__wrap(ret);
}
function caml_pasta_fp_plonk_verifier_index_shifts(log2_size) {
  var ret = wasm.caml_pasta_fp_plonk_verifier_index_shifts(log2_size);
  return WasmPastaFpPlonkVerificationShifts.__wrap(ret);
}
function caml_pasta_fp_plonk_verifier_index_dummy() {
  var ret = wasm.caml_pasta_fp_plonk_verifier_index_dummy();
  return WasmPastaFpPlonkVerifierIndex.__wrap(ret);
}
function caml_pasta_fp_plonk_verifier_index_deep_copy(x) {
  _assertClass(x, WasmPastaFpPlonkVerifierIndex);
  var ret = wasm.caml_pasta_fp_plonk_verifier_index_deep_copy(x.ptr);
  return WasmPastaFpPlonkVerifierIndex.__wrap(ret);
}
function caml_pasta_fq_plonk_verifier_index_read(offset, urs, path) {
  _assertClass(urs, WasmPastaFqUrs);
  var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fq_plonk_verifier_index_read(!isLikeNone(offset), isLikeNone(offset) ? 0 : offset, urs.ptr, ptr0, len0);
  return WasmPastaFqPlonkVerifierIndex.__wrap(ret);
}
function caml_pasta_fq_plonk_verifier_index_write(append, index, path) {
  _assertClass(index, WasmPastaFqPlonkVerifierIndex);
  var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  wasm.caml_pasta_fq_plonk_verifier_index_write(isLikeNone(append) ? 16777215 : append ? 1 : 0, index.ptr, ptr0, len0);
}
function caml_pasta_fq_plonk_verifier_index_create(index) {
  _assertClass(index, WasmPastaFqPlonkIndex);
  var ret = wasm.caml_pasta_fq_plonk_verifier_index_create(index.ptr);
  return WasmPastaFqPlonkVerifierIndex.__wrap(ret);
}
function caml_pasta_fq_plonk_verifier_index_shifts(log2_size) {
  var ret = wasm.caml_pasta_fq_plonk_verifier_index_shifts(log2_size);
  return WasmPastaFqPlonkVerificationShifts.__wrap(ret);
}
function caml_pasta_fq_plonk_verifier_index_dummy() {
  var ret = wasm.caml_pasta_fq_plonk_verifier_index_dummy();
  return WasmPastaFqPlonkVerifierIndex.__wrap(ret);
}
function caml_pasta_fq_plonk_verifier_index_deep_copy(x) {
  _assertClass(x, WasmPastaFqPlonkVerifierIndex);
  var ret = wasm.caml_pasta_fq_plonk_verifier_index_deep_copy(x.ptr);
  return WasmPastaFqPlonkVerifierIndex.__wrap(ret);
}
function caml_pasta_pallas_one() {
  var ret = wasm.caml_pasta_pallas_one();
  return WasmPallasGProjective.__wrap(ret);
}
function caml_pasta_pallas_add(x, y) {
  _assertClass(x, WasmPallasGProjective);
  _assertClass(y, WasmPallasGProjective);
  var ret = wasm.caml_pasta_pallas_add(x.ptr, y.ptr);
  return WasmPallasGProjective.__wrap(ret);
}
function caml_pasta_pallas_sub(x, y) {
  _assertClass(x, WasmPallasGProjective);
  _assertClass(y, WasmPallasGProjective);
  var ret = wasm.caml_pasta_pallas_sub(x.ptr, y.ptr);
  return WasmPallasGProjective.__wrap(ret);
}
function caml_pasta_pallas_negate(x) {
  _assertClass(x, WasmPallasGProjective);
  var ret = wasm.caml_pasta_pallas_negate(x.ptr);
  return WasmPallasGProjective.__wrap(ret);
}
function caml_pasta_pallas_double(x) {
  _assertClass(x, WasmPallasGProjective);
  var ret = wasm.caml_pasta_pallas_double(x.ptr);
  return WasmPallasGProjective.__wrap(ret);
}
function caml_pasta_pallas_scale(x, y) {
  _assertClass(x, WasmPallasGProjective);
  var ptr0 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_pallas_scale(x.ptr, ptr0, len0);
  return WasmPallasGProjective.__wrap(ret);
}
function caml_pasta_pallas_random() {
  var ret = wasm.caml_pasta_pallas_random();
  return WasmPallasGProjective.__wrap(ret);
}
function caml_pasta_pallas_rng(i) {
  var ret = wasm.caml_pasta_pallas_rng(i);
  return WasmPallasGProjective.__wrap(ret);
}
function caml_pasta_pallas_endo_base() {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_pallas_endo_base(retptr);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_pallas_endo_scalar() {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_pallas_endo_scalar(retptr);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_pallas_to_affine(x) {
  _assertClass(x, WasmPallasGProjective);
  var ret = wasm.caml_pasta_pallas_to_affine(x.ptr);
  return WasmPallasGAffine.__wrap(ret);
}
function caml_pasta_pallas_of_affine(x) {
  _assertClass(x, WasmPallasGAffine);
  var ret = wasm.caml_pasta_pallas_of_affine(x.ptr);
  return WasmPallasGProjective.__wrap(ret);
}
function caml_pasta_pallas_of_affine_coordinates(x, y) {
  var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
  var len1 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_pallas_of_affine_coordinates(ptr0, len0, ptr1, len1);
  return WasmPallasGProjective.__wrap(ret);
}
function caml_pasta_pallas_affine_deep_copy(x) {
  _assertClass(x, WasmPallasGAffine);
  var ret = wasm.caml_pasta_pallas_affine_deep_copy(x.ptr);
  return WasmPallasGAffine.__wrap(ret);
}
function caml_pasta_pallas_affine_one() {
  var ret = wasm.caml_pasta_pallas_affine_one();
  return WasmPallasGAffine.__wrap(ret);
}
function caml_pasta_vesta_one() {
  var ret = wasm.caml_pasta_vesta_one();
  return WasmVestaGProjective.__wrap(ret);
}
function caml_pasta_vesta_add(x, y) {
  _assertClass(x, WasmVestaGProjective);
  _assertClass(y, WasmVestaGProjective);
  var ret = wasm.caml_pasta_vesta_add(x.ptr, y.ptr);
  return WasmVestaGProjective.__wrap(ret);
}
function caml_pasta_vesta_sub(x, y) {
  _assertClass(x, WasmVestaGProjective);
  _assertClass(y, WasmVestaGProjective);
  var ret = wasm.caml_pasta_vesta_sub(x.ptr, y.ptr);
  return WasmVestaGProjective.__wrap(ret);
}
function caml_pasta_vesta_negate(x) {
  _assertClass(x, WasmVestaGProjective);
  var ret = wasm.caml_pasta_vesta_negate(x.ptr);
  return WasmVestaGProjective.__wrap(ret);
}
function caml_pasta_vesta_double(x) {
  _assertClass(x, WasmVestaGProjective);
  var ret = wasm.caml_pasta_vesta_double(x.ptr);
  return WasmVestaGProjective.__wrap(ret);
}
function caml_pasta_vesta_scale(x, y) {
  _assertClass(x, WasmVestaGProjective);
  var ptr0 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_vesta_scale(x.ptr, ptr0, len0);
  return WasmVestaGProjective.__wrap(ret);
}
function caml_pasta_vesta_random() {
  var ret = wasm.caml_pasta_vesta_random();
  return WasmVestaGProjective.__wrap(ret);
}
function caml_pasta_vesta_rng(i) {
  var ret = wasm.caml_pasta_vesta_rng(i);
  return WasmVestaGProjective.__wrap(ret);
}
function caml_pasta_vesta_endo_base() {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_vesta_endo_base(retptr);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_vesta_endo_scalar() {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_vesta_endo_scalar(retptr);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_vesta_to_affine(x) {
  _assertClass(x, WasmVestaGProjective);
  var ret = wasm.caml_pasta_vesta_to_affine(x.ptr);
  return WasmVestaGAffine.__wrap(ret);
}
function caml_pasta_vesta_of_affine(x) {
  _assertClass(x, WasmVestaGAffine);
  var ret = wasm.caml_pasta_vesta_of_affine(x.ptr);
  return WasmVestaGProjective.__wrap(ret);
}
function caml_pasta_vesta_of_affine_coordinates(x, y) {
  var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
  var len1 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_vesta_of_affine_coordinates(ptr0, len0, ptr1, len1);
  return WasmVestaGProjective.__wrap(ret);
}
function caml_pasta_vesta_affine_deep_copy(x) {
  _assertClass(x, WasmVestaGAffine);
  var ret = wasm.caml_pasta_pallas_affine_deep_copy(x.ptr);
  return WasmVestaGAffine.__wrap(ret);
}
function caml_pasta_vesta_affine_one() {
  var ret = wasm.caml_pasta_vesta_affine_one();
  return WasmVestaGAffine.__wrap(ret);
}
function caml_pasta_fp_urs_create(depth) {
  var ret = wasm.caml_pasta_fp_urs_create(depth);
  return WasmPastaFpUrs.__wrap(ret);
}
function caml_pasta_fp_urs_write(append, urs, path) {
  _assertClass(urs, WasmPastaFpUrs);
  var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  wasm.caml_pasta_fp_urs_write(isLikeNone(append) ? 16777215 : append ? 1 : 0, urs.ptr, ptr0, len0);
}
function caml_pasta_fp_urs_read(offset, path) {
  var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fp_urs_read(!isLikeNone(offset), isLikeNone(offset) ? 0 : offset, ptr0, len0);
  return ret === 0 ? void 0 : WasmPastaFpUrs.__wrap(ret);
}
function caml_pasta_fp_urs_lagrange_commitment(urs, domain_size, i) {
  _assertClass(urs, WasmPastaFpUrs);
  var ret = wasm.caml_pasta_fp_urs_lagrange_commitment(urs.ptr, domain_size, i);
  return WasmPastaVestaPolyComm.__wrap(ret);
}
function caml_pasta_fp_urs_commit_evaluations(urs, domain_size, evals) {
  _assertClass(urs, WasmPastaFpUrs);
  var ptr0 = passArray8ToWasm0(evals, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fp_urs_commit_evaluations(urs.ptr, domain_size, ptr0, len0);
  return WasmPastaVestaPolyComm.__wrap(ret);
}
function caml_pasta_fp_urs_b_poly_commitment(urs, chals) {
  _assertClass(urs, WasmPastaFpUrs);
  var ptr0 = passArray8ToWasm0(chals, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fp_urs_b_poly_commitment(urs.ptr, ptr0, len0);
  return WasmPastaVestaPolyComm.__wrap(ret);
}
function caml_pasta_fp_urs_batch_accumulator_check(urs, comms, chals) {
  _assertClass(urs, WasmPastaFpUrs);
  var ptr0 = passArray32ToWasm0(comms, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ptr1 = passArray8ToWasm0(chals, wasm.__wbindgen_malloc);
  var len1 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fp_urs_batch_accumulator_check(urs.ptr, ptr0, len0, ptr1, len1);
  return ret !== 0;
}
function caml_pasta_fp_urs_h(urs) {
  _assertClass(urs, WasmPastaFpUrs);
  var ret = wasm.caml_pasta_fp_urs_h(urs.ptr);
  return WasmVestaGAffine.__wrap(ret);
}
function caml_pasta_fq_urs_create(depth) {
  var ret = wasm.caml_pasta_fq_urs_create(depth);
  return WasmPastaFqUrs.__wrap(ret);
}
function caml_pasta_fq_urs_write(append, urs, path) {
  _assertClass(urs, WasmPastaFqUrs);
  var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  wasm.caml_pasta_fq_urs_write(isLikeNone(append) ? 16777215 : append ? 1 : 0, urs.ptr, ptr0, len0);
}
function caml_pasta_fq_urs_read(offset, path) {
  var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fq_urs_read(!isLikeNone(offset), isLikeNone(offset) ? 0 : offset, ptr0, len0);
  return ret === 0 ? void 0 : WasmPastaFqUrs.__wrap(ret);
}
function caml_pasta_fq_urs_lagrange_commitment(urs, domain_size, i) {
  _assertClass(urs, WasmPastaFqUrs);
  var ret = wasm.caml_pasta_fq_urs_lagrange_commitment(urs.ptr, domain_size, i);
  return WasmPastaPallasPolyComm.__wrap(ret);
}
function caml_pasta_fq_urs_commit_evaluations(urs, domain_size, evals) {
  _assertClass(urs, WasmPastaFqUrs);
  var ptr0 = passArray8ToWasm0(evals, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fq_urs_commit_evaluations(urs.ptr, domain_size, ptr0, len0);
  return WasmPastaPallasPolyComm.__wrap(ret);
}
function caml_pasta_fq_urs_b_poly_commitment(urs, chals) {
  _assertClass(urs, WasmPastaFqUrs);
  var ptr0 = passArray8ToWasm0(chals, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fq_urs_b_poly_commitment(urs.ptr, ptr0, len0);
  return WasmPastaPallasPolyComm.__wrap(ret);
}
function caml_pasta_fq_urs_batch_accumulator_check(urs, comms, chals) {
  _assertClass(urs, WasmPastaFqUrs);
  var ptr0 = passArray32ToWasm0(comms, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ptr1 = passArray8ToWasm0(chals, wasm.__wbindgen_malloc);
  var len1 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fq_urs_batch_accumulator_check(urs.ptr, ptr0, len0, ptr1, len1);
  return ret !== 0;
}
function caml_pasta_fq_urs_h(urs) {
  _assertClass(urs, WasmPastaFqUrs);
  var ret = wasm.caml_pasta_fp_urs_h(urs.ptr);
  return WasmPallasGAffine.__wrap(ret);
}
function caml_pasta_fq_plonk_gate_vector_create() {
  var ret = wasm.caml_pasta_fq_plonk_gate_vector_create();
  return WasmPastaFqPlonkGateVector.__wrap(ret);
}
function caml_pasta_fq_plonk_gate_vector_add(v, gate) {
  _assertClass(v, WasmPastaFqPlonkGateVector);
  _assertClass(gate, WasmPastaFqPlonkGate);
  var ptr0 = gate.ptr;
  gate.ptr = 0;
  wasm.caml_pasta_fq_plonk_gate_vector_add(v.ptr, ptr0);
}
function caml_pasta_fq_plonk_gate_vector_get(v, i) {
  _assertClass(v, WasmPastaFqPlonkGateVector);
  var ret = wasm.caml_pasta_fq_plonk_gate_vector_get(v.ptr, i);
  return WasmPastaFqPlonkGate.__wrap(ret);
}
function caml_pasta_fq_plonk_gate_vector_wrap(v, t, h) {
  _assertClass(v, WasmPastaFqPlonkGateVector);
  _assertClass(t, WasmPlonkWire);
  var ptr0 = t.ptr;
  t.ptr = 0;
  _assertClass(h, WasmPlonkWire);
  var ptr1 = h.ptr;
  h.ptr = 0;
  wasm.caml_pasta_fq_plonk_gate_vector_wrap(v.ptr, ptr0, ptr1);
}
function caml_pasta_fq_plonk_index_create(gates, public_, urs) {
  _assertClass(gates, WasmPastaFqPlonkGateVector);
  _assertClass(urs, WasmPastaFqUrs);
  var ret = wasm.caml_pasta_fq_plonk_index_create(gates.ptr, public_, urs.ptr);
  return WasmPastaFqPlonkIndex.__wrap(ret);
}
function caml_pasta_fq_plonk_index_max_degree(index) {
  _assertClass(index, WasmPastaFqPlonkIndex);
  var ret = wasm.caml_pasta_fq_plonk_index_max_degree(index.ptr);
  return ret;
}
function caml_pasta_fq_plonk_index_public_inputs(index) {
  _assertClass(index, WasmPastaFqPlonkIndex);
  var ret = wasm.caml_pasta_fq_plonk_index_public_inputs(index.ptr);
  return ret;
}
function caml_pasta_fq_plonk_index_domain_d1_size(index) {
  _assertClass(index, WasmPastaFqPlonkIndex);
  var ret = wasm.caml_pasta_fq_plonk_index_domain_d1_size(index.ptr);
  return ret;
}
function caml_pasta_fq_plonk_index_domain_d4_size(index) {
  _assertClass(index, WasmPastaFqPlonkIndex);
  var ret = wasm.caml_pasta_fq_plonk_index_domain_d4_size(index.ptr);
  return ret;
}
function caml_pasta_fq_plonk_index_domain_d8_size(index) {
  _assertClass(index, WasmPastaFqPlonkIndex);
  var ret = wasm.caml_pasta_fq_plonk_index_domain_d8_size(index.ptr);
  return ret;
}
function caml_pasta_fq_plonk_index_read(offset, urs, path) {
  _assertClass(urs, WasmPastaFqUrs);
  var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fq_plonk_index_read(!isLikeNone(offset), isLikeNone(offset) ? 0 : offset, urs.ptr, ptr0, len0);
  return WasmPastaFqPlonkIndex.__wrap(ret);
}
function caml_pasta_fq_plonk_index_write(append, index, path) {
  _assertClass(index, WasmPastaFqPlonkIndex);
  var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  wasm.caml_pasta_fq_plonk_index_write(isLikeNone(append) ? 16777215 : append ? 1 : 0, index.ptr, ptr0, len0);
}
function caml_pasta_fp_plonk_gate_vector_create() {
  var ret = wasm.caml_pasta_fp_plonk_gate_vector_create();
  return WasmPastaFpPlonkGateVector.__wrap(ret);
}
function caml_pasta_fp_plonk_gate_vector_add(v, gate) {
  _assertClass(v, WasmPastaFpPlonkGateVector);
  _assertClass(gate, WasmPastaFpPlonkGate);
  var ptr0 = gate.ptr;
  gate.ptr = 0;
  wasm.caml_pasta_fp_plonk_gate_vector_add(v.ptr, ptr0);
}
function caml_pasta_fp_plonk_gate_vector_get(v, i) {
  _assertClass(v, WasmPastaFpPlonkGateVector);
  var ret = wasm.caml_pasta_fp_plonk_gate_vector_get(v.ptr, i);
  return WasmPastaFpPlonkGate.__wrap(ret);
}
function caml_pasta_fp_plonk_gate_vector_wrap(v, t, h) {
  _assertClass(v, WasmPastaFpPlonkGateVector);
  _assertClass(t, WasmPlonkWire);
  var ptr0 = t.ptr;
  t.ptr = 0;
  _assertClass(h, WasmPlonkWire);
  var ptr1 = h.ptr;
  h.ptr = 0;
  wasm.caml_pasta_fp_plonk_gate_vector_wrap(v.ptr, ptr0, ptr1);
}
function caml_pasta_fp_plonk_index_create(gates, public_, urs) {
  _assertClass(gates, WasmPastaFpPlonkGateVector);
  _assertClass(urs, WasmPastaFpUrs);
  var ret = wasm.caml_pasta_fp_plonk_index_create(gates.ptr, public_, urs.ptr);
  return WasmPastaFpPlonkIndex.__wrap(ret);
}
function caml_pasta_fp_plonk_index_max_degree(index) {
  _assertClass(index, WasmPastaFpPlonkIndex);
  var ret = wasm.caml_pasta_fp_plonk_index_max_degree(index.ptr);
  return ret;
}
function caml_pasta_fp_plonk_index_public_inputs(index) {
  _assertClass(index, WasmPastaFpPlonkIndex);
  var ret = wasm.caml_pasta_fp_plonk_index_public_inputs(index.ptr);
  return ret;
}
function caml_pasta_fp_plonk_index_domain_d1_size(index) {
  _assertClass(index, WasmPastaFpPlonkIndex);
  var ret = wasm.caml_pasta_fp_plonk_index_domain_d1_size(index.ptr);
  return ret;
}
function caml_pasta_fp_plonk_index_domain_d4_size(index) {
  _assertClass(index, WasmPastaFpPlonkIndex);
  var ret = wasm.caml_pasta_fp_plonk_index_domain_d4_size(index.ptr);
  return ret;
}
function caml_pasta_fp_plonk_index_domain_d8_size(index) {
  _assertClass(index, WasmPastaFpPlonkIndex);
  var ret = wasm.caml_pasta_fp_plonk_index_domain_d8_size(index.ptr);
  return ret;
}
function caml_pasta_fp_plonk_index_read(offset, urs, path) {
  _assertClass(urs, WasmPastaFpUrs);
  var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fp_plonk_index_read(!isLikeNone(offset), isLikeNone(offset) ? 0 : offset, urs.ptr, ptr0, len0);
  return WasmPastaFpPlonkIndex.__wrap(ret);
}
function caml_pasta_fp_plonk_index_write(append, index, path) {
  _assertClass(index, WasmPastaFpPlonkIndex);
  var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  wasm.caml_pasta_fp_plonk_index_write(isLikeNone(append) ? 16777215 : append ? 1 : 0, index.ptr, ptr0, len0);
}
function caml_bigint_256_of_numeral(s, _len, base) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_bigint_256_of_numeral(retptr, ptr0, len0, _len, base);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_bigint_256_of_decimal_string(s) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_bigint_256_of_decimal_string(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_bigint_256_num_limbs() {
  var ret = wasm.caml_bigint_256_num_limbs();
  return ret;
}
function caml_bigint_256_bytes_per_limb() {
  var ret = wasm.caml_bigint_256_bytes_per_limb();
  return ret;
}
function caml_bigint_256_div(x, y) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.caml_bigint_256_div(retptr, ptr0, len0, ptr1, len1);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v2 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v2;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_bigint_256_compare(x, y) {
  var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
  var len1 = WASM_VECTOR_LEN;
  var ret = wasm.caml_bigint_256_compare(ptr0, len0, ptr1, len1);
  return ret;
}
function caml_bigint_256_print(x) {
  var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  wasm.caml_bigint_256_print(ptr0, len0);
}
function caml_bigint_256_to_string(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_bigint_256_to_string(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    return getStringFromWasm0(r0, r1);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_free(r0, r1);
  }
}
function caml_bigint_256_test_bit(x, i) {
  var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_bigint_256_test_bit(ptr0, len0, i);
  return ret !== 0;
}
function caml_bigint_256_to_bytes(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_bigint_256_to_bytes(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_bigint_256_of_bytes(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_bigint_256_of_bytes(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_bigint_256_deep_copy(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_bigint_256_deep_copy(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function greet(name) {
  var ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  wasm.greet(ptr0, len0);
}
function console_log(s) {
  var ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  wasm.console_log(ptr0, len0);
}
function create_zero_u32_ptr() {
  var ret = wasm.create_zero_u32_ptr();
  return ret;
}
function free_u32_ptr(ptr) {
  wasm.free_u32_ptr(ptr);
}
function set_u32_ptr(ptr, arg) {
  wasm.set_u32_ptr(ptr, arg);
}
function wait_until_non_zero(ptr) {
  var ret = wasm.wait_until_non_zero(ptr);
  return ret >>> 0;
}
function caml_pasta_fq_plonk_proof_create(index, primary_input, auxiliary_input, prev_challenges, prev_sgs) {
  _assertClass(index, WasmPastaFqPlonkIndex);
  var ptr0 = passArray8ToWasm0(primary_input, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ptr1 = passArray8ToWasm0(auxiliary_input, wasm.__wbindgen_malloc);
  var len1 = WASM_VECTOR_LEN;
  var ptr2 = passArray8ToWasm0(prev_challenges, wasm.__wbindgen_malloc);
  var len2 = WASM_VECTOR_LEN;
  var ptr3 = passArray32ToWasm0(prev_sgs, wasm.__wbindgen_malloc);
  var len3 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fq_plonk_proof_create(index.ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
  return WasmPastaFqProverProof.__wrap(ret);
}
function caml_pasta_fq_plonk_proof_verify(lgr_comm, index, proof) {
  var ptr0 = passArray32ToWasm0(lgr_comm, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  _assertClass(index, WasmPastaFqPlonkVerifierIndex);
  var ptr1 = index.ptr;
  index.ptr = 0;
  _assertClass(proof, WasmPastaFqProverProof);
  var ptr2 = proof.ptr;
  proof.ptr = 0;
  var ret = wasm.caml_pasta_fq_plonk_proof_verify(ptr0, len0, ptr1, ptr2);
  return ret !== 0;
}
function caml_pasta_fq_plonk_proof_batch_verify(lgr_comms, indexes, proofs) {
  _assertClass(lgr_comms, WasmVecVecPallasPolyComm);
  var ptr0 = lgr_comms.ptr;
  lgr_comms.ptr = 0;
  var ptr1 = passArray32ToWasm0(indexes, wasm.__wbindgen_malloc);
  var len1 = WASM_VECTOR_LEN;
  var ptr2 = passArray32ToWasm0(proofs, wasm.__wbindgen_malloc);
  var len2 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fq_plonk_proof_batch_verify(ptr0, ptr1, len1, ptr2, len2);
  return ret !== 0;
}
function caml_pasta_fq_plonk_proof_dummy() {
  var ret = wasm.caml_pasta_fq_plonk_proof_dummy();
  return WasmPastaFqProverProof.__wrap(ret);
}
function caml_pasta_fq_plonk_proof_deep_copy(x) {
  _assertClass(x, WasmPastaFqProverProof);
  var ptr0 = x.ptr;
  x.ptr = 0;
  var ret = wasm.caml_pasta_fq_plonk_proof_deep_copy(ptr0);
  return WasmPastaFqProverProof.__wrap(ret);
}
function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
  }
}
function initThreadPool(num_threads) {
  var ret = wasm.initThreadPool(num_threads);
  return takeObject(ret);
}
function wbg_rayon_start_worker(receiver) {
  wasm.wbg_rayon_start_worker(receiver);
}
var WasmPlonkGateType = Object.freeze({ Zero: 0, "0": "Zero", Generic: 1, "1": "Generic", Poseidon: 2, "2": "Poseidon", Add1: 3, "3": "Add1", Add2: 4, "4": "Add2", Vbmul1: 5, "5": "Vbmul1", Vbmul2: 6, "6": "Vbmul2", Vbmul3: 7, "7": "Vbmul3", Endomul1: 8, "8": "Endomul1", Endomul2: 9, "9": "Endomul2", Endomul3: 10, "10": "Endomul3", Endomul4: 11, "11": "Endomul4" });
var WasmPlonkCol = Object.freeze({ L: 0, "0": "L", R: 1, "1": "R", O: 2, "2": "O" });
var WasmPallasGAffine = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPallasGAffine.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpallasgaffine_free(ptr);
  }
  get x() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmpallasgaffine_x(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set x(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmpallasgaffine_x(this.ptr, ptr0, len0);
  }
  get y() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmpallasgaffine_y(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set y(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmpallasgaffine_y(this.ptr, ptr0, len0);
  }
  get infinity() {
    var ret = wasm.__wbg_get_wasmpallasgaffine_infinity(this.ptr);
    return ret !== 0;
  }
  set infinity(arg0) {
    wasm.__wbg_set_wasmpallasgaffine_infinity(this.ptr, arg0);
  }
};
var WasmPallasGProjective = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPallasGProjective.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpallasgprojective_free(ptr);
  }
};
var WasmPastaFpOpeningProof = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFpOpeningProof.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafpopeningproof_free(ptr);
  }
  get z1() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmpastafpopeningproof_z1(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set z1(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmpastafpopeningproof_z1(this.ptr, ptr0, len0);
  }
  get z2() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmpastafpopeningproof_z2(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set z2(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmpastafpopeningproof_z2(this.ptr, ptr0, len0);
  }
  constructor(lr_0, lr_1, delta, z1, z2, sg) {
    var ptr0 = passArray32ToWasm0(lr_0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray32ToWasm0(lr_1, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    _assertClass(delta, WasmVestaGAffine);
    var ptr2 = delta.ptr;
    delta.ptr = 0;
    var ptr3 = passArray8ToWasm0(z1, wasm.__wbindgen_malloc);
    var len3 = WASM_VECTOR_LEN;
    var ptr4 = passArray8ToWasm0(z2, wasm.__wbindgen_malloc);
    var len4 = WASM_VECTOR_LEN;
    _assertClass(sg, WasmVestaGAffine);
    var ptr5 = sg.ptr;
    sg.ptr = 0;
    var ret = wasm.wasmpastafpopeningproof_new(ptr0, len0, ptr1, len1, ptr2, ptr3, len3, ptr4, len4, ptr5);
    return WasmPastaFpOpeningProof.__wrap(ret);
  }
  get lr_0() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafpopeningproof_lr_0(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU32FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 4);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get lr_1() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafpopeningproof_lr_1(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU32FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 4);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get delta() {
    var ret = wasm.wasmpastafpopeningproof_delta(this.ptr);
    return WasmVestaGAffine.__wrap(ret);
  }
  get sg() {
    var ret = wasm.wasmpastafpopeningproof_sg(this.ptr);
    return WasmVestaGAffine.__wrap(ret);
  }
  set lr_0(lr_0) {
    var ptr0 = passArray32ToWasm0(lr_0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafpopeningproof_set_lr_0(this.ptr, ptr0, len0);
  }
  set lr_1(lr_1) {
    var ptr0 = passArray32ToWasm0(lr_1, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafpopeningproof_set_lr_1(this.ptr, ptr0, len0);
  }
  set delta(delta) {
    _assertClass(delta, WasmVestaGAffine);
    var ptr0 = delta.ptr;
    delta.ptr = 0;
    wasm.wasmpastafpopeningproof_set_delta(this.ptr, ptr0);
  }
  set sg(sg) {
    _assertClass(sg, WasmVestaGAffine);
    var ptr0 = sg.ptr;
    sg.ptr = 0;
    wasm.wasmpastafpopeningproof_set_sg(this.ptr, ptr0);
  }
};
var WasmPastaFpPlonkDomain = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFpPlonkDomain.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafpplonkdomain_free(ptr);
  }
  get log_size_of_group() {
    var ret = wasm.__wbg_get_wasmpastafpplonkdomain_log_size_of_group(this.ptr);
    return ret;
  }
  set log_size_of_group(arg0) {
    wasm.__wbg_set_wasmpastafpplonkdomain_log_size_of_group(this.ptr, arg0);
  }
  get group_gen() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmpastafpplonkdomain_group_gen(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set group_gen(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmpastafpplonkdomain_group_gen(this.ptr, ptr0, len0);
  }
  constructor(log_size_of_group, group_gen) {
    var ptr0 = passArray8ToWasm0(group_gen, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.wasmpastafpplonkdomain_new(log_size_of_group, ptr0, len0);
    return WasmPastaFpPlonkDomain.__wrap(ret);
  }
};
var WasmPastaFpPlonkGate = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFpPlonkGate.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafpplonkgate_free(ptr);
  }
  get typ() {
    var ret = wasm.__wbg_get_wasmpastafpplonkgate_typ(this.ptr);
    return ret >>> 0;
  }
  set typ(arg0) {
    wasm.__wbg_set_wasmpastafpplonkgate_typ(this.ptr, arg0);
  }
  get wires() {
    var ret = wasm.__wbg_get_wasmpastafpplonkgate_wires(this.ptr);
    return WasmPlonkWires.__wrap(ret);
  }
  set wires(arg0) {
    _assertClass(arg0, WasmPlonkWires);
    var ptr0 = arg0.ptr;
    arg0.ptr = 0;
    wasm.__wbg_set_wasmpastafpplonkgate_wires(this.ptr, ptr0);
  }
  constructor(typ, wires, c) {
    _assertClass(wires, WasmPlonkWires);
    var ptr0 = wires.ptr;
    wires.ptr = 0;
    var ptr1 = passArray8ToWasm0(c, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    var ret = wasm.wasmpastafpplonkgate_new(typ, ptr0, ptr1, len1);
    return WasmPastaFpPlonkGate.__wrap(ret);
  }
  get c() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafpplonkgate_c(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set c(c) {
    var ptr0 = passArray8ToWasm0(c, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafpplonkgate_set_c(this.ptr, ptr0, len0);
  }
};
var WasmPastaFpPlonkGateVector = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFpPlonkGateVector.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafpplonkgatevector_free(ptr);
  }
};
var WasmPastaFpPlonkIndex = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFpPlonkIndex.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafpplonkindex_free(ptr);
  }
};
var WasmPastaFpPlonkOracles = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFpPlonkOracles.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafpplonkoracles_free(ptr);
  }
  get o() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmpastafpplonkoracles_o(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set o(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmpastafpplonkoracles_o(this.ptr, ptr0, len0);
  }
  get p_eval0() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmpastafpplonkoracles_p_eval0(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set p_eval0(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmpastafpplonkoracles_p_eval0(this.ptr, ptr0, len0);
  }
  get p_eval1() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmpastafpplonkoracles_p_eval1(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set p_eval1(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmpastafpplonkoracles_p_eval1(this.ptr, ptr0, len0);
  }
  get digest_before_evaluations() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmpastafpplonkoracles_digest_before_evaluations(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set digest_before_evaluations(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmpastafpplonkoracles_digest_before_evaluations(this.ptr, ptr0, len0);
  }
  constructor(o, p_eval0, p_eval1, opening_prechallenges, digest_before_evaluations) {
    var ptr0 = passArray8ToWasm0(o, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(p_eval0, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    var ptr2 = passArray8ToWasm0(p_eval1, wasm.__wbindgen_malloc);
    var len2 = WASM_VECTOR_LEN;
    var ptr3 = passArray8ToWasm0(opening_prechallenges, wasm.__wbindgen_malloc);
    var len3 = WASM_VECTOR_LEN;
    var ptr4 = passArray8ToWasm0(digest_before_evaluations, wasm.__wbindgen_malloc);
    var len4 = WASM_VECTOR_LEN;
    var ret = wasm.wasmpastafpplonkoracles_new(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4);
    return WasmPastaFpPlonkOracles.__wrap(ret);
  }
  get opening_prechallenges() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafpplonkoracles_opening_prechallenges(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set opening_prechallenges(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafpplonkoracles_set_opening_prechallenges(this.ptr, ptr0, len0);
  }
};
var WasmPastaFpPlonkVerificationEvals = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFpPlonkVerificationEvals.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafpplonkverificationevals_free(ptr);
  }
  get sigma_comm0() {
    var ret = wasm.wasmpastafpplonkverificationevals_sigma_comm0(this.ptr);
    return WasmPastaVestaPolyComm.__wrap(ret);
  }
  get sigma_comm1() {
    var ret = wasm.wasmpastafpplonkverificationevals_sigma_comm1(this.ptr);
    return WasmPastaVestaPolyComm.__wrap(ret);
  }
  get sigma_comm2() {
    var ret = wasm.wasmpastafpplonkverificationevals_sigma_comm2(this.ptr);
    return WasmPastaVestaPolyComm.__wrap(ret);
  }
  get ql_comm() {
    var ret = wasm.wasmpastafpplonkverificationevals_ql_comm(this.ptr);
    return WasmPastaVestaPolyComm.__wrap(ret);
  }
  get qr_comm() {
    var ret = wasm.wasmpastafpplonkverificationevals_qr_comm(this.ptr);
    return WasmPastaVestaPolyComm.__wrap(ret);
  }
  get qo_comm() {
    var ret = wasm.wasmpastafpplonkverificationevals_qo_comm(this.ptr);
    return WasmPastaVestaPolyComm.__wrap(ret);
  }
  get qm_comm() {
    var ret = wasm.wasmpastafpplonkverificationevals_qm_comm(this.ptr);
    return WasmPastaVestaPolyComm.__wrap(ret);
  }
  get qc_comm() {
    var ret = wasm.wasmpastafpplonkverificationevals_qc_comm(this.ptr);
    return WasmPastaVestaPolyComm.__wrap(ret);
  }
  get rcm_comm0() {
    var ret = wasm.wasmpastafpplonkverificationevals_rcm_comm0(this.ptr);
    return WasmPastaVestaPolyComm.__wrap(ret);
  }
  get rcm_comm1() {
    var ret = wasm.wasmpastafpplonkverificationevals_rcm_comm1(this.ptr);
    return WasmPastaVestaPolyComm.__wrap(ret);
  }
  get rcm_comm2() {
    var ret = wasm.wasmpastafpplonkverificationevals_rcm_comm2(this.ptr);
    return WasmPastaVestaPolyComm.__wrap(ret);
  }
  get psm_comm() {
    var ret = wasm.wasmpastafpplonkverificationevals_psm_comm(this.ptr);
    return WasmPastaVestaPolyComm.__wrap(ret);
  }
  get add_comm() {
    var ret = wasm.wasmpastafpplonkverificationevals_add_comm(this.ptr);
    return WasmPastaVestaPolyComm.__wrap(ret);
  }
  get mul1_comm() {
    var ret = wasm.wasmpastafpplonkverificationevals_mul1_comm(this.ptr);
    return WasmPastaVestaPolyComm.__wrap(ret);
  }
  get mul2_comm() {
    var ret = wasm.wasmpastafpplonkverificationevals_mul2_comm(this.ptr);
    return WasmPastaVestaPolyComm.__wrap(ret);
  }
  get emul1_comm() {
    var ret = wasm.wasmpastafpplonkverificationevals_emul1_comm(this.ptr);
    return WasmPastaVestaPolyComm.__wrap(ret);
  }
  get emul2_comm() {
    var ret = wasm.wasmpastafpplonkverificationevals_emul2_comm(this.ptr);
    return WasmPastaVestaPolyComm.__wrap(ret);
  }
  get emul3_comm() {
    var ret = wasm.wasmpastafpplonkverificationevals_emul3_comm(this.ptr);
    return WasmPastaVestaPolyComm.__wrap(ret);
  }
  set sigma_comm0(x) {
    _assertClass(x, WasmPastaVestaPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_sigma_comm0(this.ptr, ptr0);
  }
  set sigma_comm1(x) {
    _assertClass(x, WasmPastaVestaPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_sigma_comm1(this.ptr, ptr0);
  }
  set sigma_comm2(x) {
    _assertClass(x, WasmPastaVestaPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_sigma_comm2(this.ptr, ptr0);
  }
  set ql_comm(x) {
    _assertClass(x, WasmPastaVestaPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_ql_comm(this.ptr, ptr0);
  }
  set qr_comm(x) {
    _assertClass(x, WasmPastaVestaPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_qr_comm(this.ptr, ptr0);
  }
  set qo_comm(x) {
    _assertClass(x, WasmPastaVestaPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_qo_comm(this.ptr, ptr0);
  }
  set qm_comm(x) {
    _assertClass(x, WasmPastaVestaPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_qm_comm(this.ptr, ptr0);
  }
  set qc_comm(x) {
    _assertClass(x, WasmPastaVestaPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_qc_comm(this.ptr, ptr0);
  }
  set rcm_comm0(x) {
    _assertClass(x, WasmPastaVestaPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_rcm_comm0(this.ptr, ptr0);
  }
  set rcm_comm1(x) {
    _assertClass(x, WasmPastaVestaPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_rcm_comm1(this.ptr, ptr0);
  }
  set rcm_comm2(x) {
    _assertClass(x, WasmPastaVestaPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_rcm_comm2(this.ptr, ptr0);
  }
  set psm_comm(x) {
    _assertClass(x, WasmPastaVestaPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_psm_comm(this.ptr, ptr0);
  }
  set add_comm(x) {
    _assertClass(x, WasmPastaVestaPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_add_comm(this.ptr, ptr0);
  }
  set mul1_comm(x) {
    _assertClass(x, WasmPastaVestaPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_mul1_comm(this.ptr, ptr0);
  }
  set mul2_comm(x) {
    _assertClass(x, WasmPastaVestaPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_mul2_comm(this.ptr, ptr0);
  }
  set emul1_comm(x) {
    _assertClass(x, WasmPastaVestaPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_emul1_comm(this.ptr, ptr0);
  }
  set emul2_comm(x) {
    _assertClass(x, WasmPastaVestaPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_emul2_comm(this.ptr, ptr0);
  }
  set emul3_comm(x) {
    _assertClass(x, WasmPastaVestaPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_emul3_comm(this.ptr, ptr0);
  }
  constructor(sigma_comm0, sigma_comm1, sigma_comm2, ql_comm, qr_comm, qo_comm, qm_comm, qc_comm, rcm_comm0, rcm_comm1, rcm_comm2, psm_comm, add_comm, mul1_comm, mul2_comm, emul1_comm, emul2_comm, emul3_comm) {
    _assertClass(sigma_comm0, WasmPastaVestaPolyComm);
    _assertClass(sigma_comm1, WasmPastaVestaPolyComm);
    _assertClass(sigma_comm2, WasmPastaVestaPolyComm);
    _assertClass(ql_comm, WasmPastaVestaPolyComm);
    _assertClass(qr_comm, WasmPastaVestaPolyComm);
    _assertClass(qo_comm, WasmPastaVestaPolyComm);
    _assertClass(qm_comm, WasmPastaVestaPolyComm);
    _assertClass(qc_comm, WasmPastaVestaPolyComm);
    _assertClass(rcm_comm0, WasmPastaVestaPolyComm);
    _assertClass(rcm_comm1, WasmPastaVestaPolyComm);
    _assertClass(rcm_comm2, WasmPastaVestaPolyComm);
    _assertClass(psm_comm, WasmPastaVestaPolyComm);
    _assertClass(add_comm, WasmPastaVestaPolyComm);
    _assertClass(mul1_comm, WasmPastaVestaPolyComm);
    _assertClass(mul2_comm, WasmPastaVestaPolyComm);
    _assertClass(emul1_comm, WasmPastaVestaPolyComm);
    _assertClass(emul2_comm, WasmPastaVestaPolyComm);
    _assertClass(emul3_comm, WasmPastaVestaPolyComm);
    var ret = wasm.wasmpastafpplonkverificationevals_new(sigma_comm0.ptr, sigma_comm1.ptr, sigma_comm2.ptr, ql_comm.ptr, qr_comm.ptr, qo_comm.ptr, qm_comm.ptr, qc_comm.ptr, rcm_comm0.ptr, rcm_comm1.ptr, rcm_comm2.ptr, psm_comm.ptr, add_comm.ptr, mul1_comm.ptr, mul2_comm.ptr, emul1_comm.ptr, emul2_comm.ptr, emul3_comm.ptr);
    return WasmPastaFpPlonkVerificationEvals.__wrap(ret);
  }
};
var WasmPastaFpPlonkVerificationShifts = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFpPlonkVerificationShifts.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafpplonkverificationshifts_free(ptr);
  }
  get r() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmpastafpplonkdomain_group_gen(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set r(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmpastafpplonkdomain_group_gen(this.ptr, ptr0, len0);
  }
  get o() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmpastafpplonkverificationshifts_o(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set o(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmpastafpplonkverificationshifts_o(this.ptr, ptr0, len0);
  }
  constructor(r, o) {
    var ptr0 = passArray8ToWasm0(r, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(o, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    var ret = wasm.wasmpastafpplonkverificationshifts_new(ptr0, len0, ptr1, len1);
    return WasmPastaFpPlonkVerificationShifts.__wrap(ret);
  }
};
var WasmPastaFpPlonkVerifierIndex = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFpPlonkVerifierIndex.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafpplonkverifierindex_free(ptr);
  }
  get domain() {
    var ret = wasm.__wbg_get_wasmpastafpplonkverifierindex_domain(this.ptr);
    return WasmPastaFpPlonkDomain.__wrap(ret);
  }
  set domain(arg0) {
    _assertClass(arg0, WasmPastaFpPlonkDomain);
    var ptr0 = arg0.ptr;
    arg0.ptr = 0;
    wasm.__wbg_set_wasmpastafpplonkverifierindex_domain(this.ptr, ptr0);
  }
  get max_poly_size() {
    var ret = wasm.__wbg_get_wasmpastafpplonkverifierindex_max_poly_size(this.ptr);
    return ret;
  }
  set max_poly_size(arg0) {
    wasm.__wbg_set_wasmpastafpplonkverifierindex_max_poly_size(this.ptr, arg0);
  }
  get max_quot_size() {
    var ret = wasm.__wbg_get_wasmpastafpplonkverifierindex_max_quot_size(this.ptr);
    return ret;
  }
  set max_quot_size(arg0) {
    wasm.__wbg_set_wasmpastafpplonkverifierindex_max_quot_size(this.ptr, arg0);
  }
  get shifts() {
    var ret = wasm.__wbg_get_wasmpastafpplonkverifierindex_shifts(this.ptr);
    return WasmPastaFpPlonkVerificationShifts.__wrap(ret);
  }
  set shifts(arg0) {
    _assertClass(arg0, WasmPastaFpPlonkVerificationShifts);
    var ptr0 = arg0.ptr;
    arg0.ptr = 0;
    wasm.__wbg_set_wasmpastafpplonkverifierindex_shifts(this.ptr, ptr0);
  }
  constructor(domain, max_poly_size, max_quot_size, urs, evals, shifts) {
    _assertClass(domain, WasmPastaFpPlonkDomain);
    _assertClass(urs, WasmPastaFpUrs);
    _assertClass(evals, WasmPastaFpPlonkVerificationEvals);
    _assertClass(shifts, WasmPastaFpPlonkVerificationShifts);
    var ret = wasm.wasmpastafpplonkverifierindex_new(domain.ptr, max_poly_size, max_quot_size, urs.ptr, evals.ptr, shifts.ptr);
    return WasmPastaFpPlonkVerifierIndex.__wrap(ret);
  }
  get urs() {
    var ret = wasm.wasmpastafpplonkverifierindex_urs(this.ptr);
    return WasmPastaFpUrs.__wrap(ret);
  }
  set urs(x) {
    _assertClass(x, WasmPastaFpUrs);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverifierindex_set_urs(this.ptr, ptr0);
  }
  get evals() {
    var ret = wasm.wasmpastafpplonkverifierindex_evals(this.ptr);
    return WasmPastaFpPlonkVerificationEvals.__wrap(ret);
  }
  set evals(x) {
    _assertClass(x, WasmPastaFpPlonkVerificationEvals);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverifierindex_set_evals(this.ptr, ptr0);
  }
};
var WasmPastaFpProofEvaluations = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFpProofEvaluations.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafpproofevaluations_free(ptr);
  }
  constructor(l, r, o, z, t, f, sigma1, sigma2) {
    var ptr0 = passArray8ToWasm0(l, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(r, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    var ptr2 = passArray8ToWasm0(o, wasm.__wbindgen_malloc);
    var len2 = WASM_VECTOR_LEN;
    var ptr3 = passArray8ToWasm0(z, wasm.__wbindgen_malloc);
    var len3 = WASM_VECTOR_LEN;
    var ptr4 = passArray8ToWasm0(t, wasm.__wbindgen_malloc);
    var len4 = WASM_VECTOR_LEN;
    var ptr5 = passArray8ToWasm0(f, wasm.__wbindgen_malloc);
    var len5 = WASM_VECTOR_LEN;
    var ptr6 = passArray8ToWasm0(sigma1, wasm.__wbindgen_malloc);
    var len6 = WASM_VECTOR_LEN;
    var ptr7 = passArray8ToWasm0(sigma2, wasm.__wbindgen_malloc);
    var len7 = WASM_VECTOR_LEN;
    var ret = wasm.wasmpastafpproofevaluations_new(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7);
    return WasmPastaFpProofEvaluations.__wrap(ret);
  }
  get l() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafpproofevaluations_l(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get r() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafpproofevaluations_r(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get o() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafpproofevaluations_o(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get z() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafpproofevaluations_z(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get t() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafpproofevaluations_t(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get f() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafpproofevaluations_f(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get sigma1() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafpproofevaluations_sigma1(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get sigma2() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafpproofevaluations_sigma2(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set l(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafpproofevaluations_set_l(this.ptr, ptr0, len0);
  }
  set r(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafpproofevaluations_set_r(this.ptr, ptr0, len0);
  }
  set o(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafpproofevaluations_set_o(this.ptr, ptr0, len0);
  }
  set z(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafpproofevaluations_set_z(this.ptr, ptr0, len0);
  }
  set t(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafpproofevaluations_set_t(this.ptr, ptr0, len0);
  }
  set f(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafpproofevaluations_set_f(this.ptr, ptr0, len0);
  }
  set sigma1(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafpproofevaluations_set_sigma1(this.ptr, ptr0, len0);
  }
  set sigma2(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafpproofevaluations_set_sigma2(this.ptr, ptr0, len0);
  }
};
var WasmPastaFpProverCommitments = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFpProverCommitments.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafpprovercommitments_free(ptr);
  }
  constructor(l_comm, r_comm, o_comm, z_comm, t_comm) {
    _assertClass(l_comm, WasmPastaVestaPolyComm);
    var ptr0 = l_comm.ptr;
    l_comm.ptr = 0;
    _assertClass(r_comm, WasmPastaVestaPolyComm);
    var ptr1 = r_comm.ptr;
    r_comm.ptr = 0;
    _assertClass(o_comm, WasmPastaVestaPolyComm);
    var ptr2 = o_comm.ptr;
    o_comm.ptr = 0;
    _assertClass(z_comm, WasmPastaVestaPolyComm);
    var ptr3 = z_comm.ptr;
    z_comm.ptr = 0;
    _assertClass(t_comm, WasmPastaVestaPolyComm);
    var ptr4 = t_comm.ptr;
    t_comm.ptr = 0;
    var ret = wasm.wasmpastafpprovercommitments_new(ptr0, ptr1, ptr2, ptr3, ptr4);
    return WasmPastaFpProverCommitments.__wrap(ret);
  }
  get l_comm() {
    var ret = wasm.wasmpastafpprovercommitments_l_comm(this.ptr);
    return WasmPastaVestaPolyComm.__wrap(ret);
  }
  get r_comm() {
    var ret = wasm.wasmpastafpprovercommitments_r_comm(this.ptr);
    return WasmPastaVestaPolyComm.__wrap(ret);
  }
  get o_comm() {
    var ret = wasm.wasmpastafpprovercommitments_o_comm(this.ptr);
    return WasmPastaVestaPolyComm.__wrap(ret);
  }
  get z_comm() {
    var ret = wasm.wasmpastafpprovercommitments_z_comm(this.ptr);
    return WasmPastaVestaPolyComm.__wrap(ret);
  }
  get t_comm() {
    var ret = wasm.wasmpastafpprovercommitments_t_comm(this.ptr);
    return WasmPastaVestaPolyComm.__wrap(ret);
  }
  set l_comm(x) {
    _assertClass(x, WasmPastaVestaPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpprovercommitments_set_l_comm(this.ptr, ptr0);
  }
  set r_comm(x) {
    _assertClass(x, WasmPastaVestaPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpprovercommitments_set_r_comm(this.ptr, ptr0);
  }
  set o_comm(x) {
    _assertClass(x, WasmPastaVestaPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpprovercommitments_set_o_comm(this.ptr, ptr0);
  }
  set z_comm(x) {
    _assertClass(x, WasmPastaVestaPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpprovercommitments_set_z_comm(this.ptr, ptr0);
  }
  set t_comm(x) {
    _assertClass(x, WasmPastaVestaPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpprovercommitments_set_t_comm(this.ptr, ptr0);
  }
};
var WasmPastaFpProverProof = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFpProverProof.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafpproverproof_free(ptr);
  }
  constructor(commitments, proof, evals0, evals1, public_, prev_challenges_scalars, prev_challenges_comms) {
    _assertClass(commitments, WasmPastaFpProverCommitments);
    var ptr0 = commitments.ptr;
    commitments.ptr = 0;
    _assertClass(proof, WasmPastaFpOpeningProof);
    var ptr1 = proof.ptr;
    proof.ptr = 0;
    _assertClass(evals0, WasmPastaFpProofEvaluations);
    var ptr2 = evals0.ptr;
    evals0.ptr = 0;
    _assertClass(evals1, WasmPastaFpProofEvaluations);
    var ptr3 = evals1.ptr;
    evals1.ptr = 0;
    var ptr4 = passArray8ToWasm0(public_, wasm.__wbindgen_malloc);
    var len4 = WASM_VECTOR_LEN;
    _assertClass(prev_challenges_scalars, WasmVecVecPastaFp);
    var ptr5 = prev_challenges_scalars.ptr;
    prev_challenges_scalars.ptr = 0;
    var ptr6 = passArray32ToWasm0(prev_challenges_comms, wasm.__wbindgen_malloc);
    var len6 = WASM_VECTOR_LEN;
    var ret = wasm.wasmpastafpproverproof_new(ptr0, ptr1, ptr2, ptr3, ptr4, len4, ptr5, ptr6, len6);
    return WasmPastaFpProverProof.__wrap(ret);
  }
  get commitments() {
    var ret = wasm.wasmpastafpproverproof_commitments(this.ptr);
    return WasmPastaFpProverCommitments.__wrap(ret);
  }
  get proof() {
    var ret = wasm.wasmpastafpproverproof_proof(this.ptr);
    return WasmPastaFpOpeningProof.__wrap(ret);
  }
  get evals0() {
    var ret = wasm.wasmpastafpproverproof_evals0(this.ptr);
    return WasmPastaFpProofEvaluations.__wrap(ret);
  }
  get evals1() {
    var ret = wasm.wasmpastafpproverproof_evals1(this.ptr);
    return WasmPastaFpProofEvaluations.__wrap(ret);
  }
  get public_() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafpproverproof_public_(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get prev_challenges_scalars() {
    var ret = wasm.wasmpastafpproverproof_prev_challenges_scalars(this.ptr);
    return WasmVecVecPastaFp.__wrap(ret);
  }
  get prev_challenges_comms() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafpproverproof_prev_challenges_comms(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU32FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 4);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set commitments(commitments) {
    _assertClass(commitments, WasmPastaFpProverCommitments);
    var ptr0 = commitments.ptr;
    commitments.ptr = 0;
    wasm.wasmpastafpproverproof_set_commitments(this.ptr, ptr0);
  }
  set proof(proof) {
    _assertClass(proof, WasmPastaFpOpeningProof);
    var ptr0 = proof.ptr;
    proof.ptr = 0;
    wasm.wasmpastafpproverproof_set_proof(this.ptr, ptr0);
  }
  set evals0(evals0) {
    _assertClass(evals0, WasmPastaFpProofEvaluations);
    var ptr0 = evals0.ptr;
    evals0.ptr = 0;
    wasm.wasmpastafpproverproof_set_evals0(this.ptr, ptr0);
  }
  set evals1(evals1) {
    _assertClass(evals1, WasmPastaFpProofEvaluations);
    var ptr0 = evals1.ptr;
    evals1.ptr = 0;
    wasm.wasmpastafpproverproof_set_evals1(this.ptr, ptr0);
  }
  set public_(public_) {
    var ptr0 = passArray8ToWasm0(public_, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafpproverproof_set_public_(this.ptr, ptr0, len0);
  }
  set prev_challenges_scalars(prev_challenges_scalars) {
    _assertClass(prev_challenges_scalars, WasmVecVecPastaFp);
    var ptr0 = prev_challenges_scalars.ptr;
    prev_challenges_scalars.ptr = 0;
    wasm.wasmpastafpproverproof_set_prev_challenges_scalars(this.ptr, ptr0);
  }
  set prev_challenges_comms(prev_challenges_comms) {
    var ptr0 = passArray32ToWasm0(prev_challenges_comms, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafpproverproof_set_prev_challenges_comms(this.ptr, ptr0, len0);
  }
};
var WasmPastaFpUrs = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFpUrs.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafpurs_free(ptr);
  }
};
var WasmPastaFqOpeningProof = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFqOpeningProof.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafqopeningproof_free(ptr);
  }
  get z1() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmpastafqopeningproof_z1(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set z1(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmpastafqopeningproof_z1(this.ptr, ptr0, len0);
  }
  get z2() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmpastafqopeningproof_z2(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set z2(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmpastafqopeningproof_z2(this.ptr, ptr0, len0);
  }
  constructor(lr_0, lr_1, delta, z1, z2, sg) {
    var ptr0 = passArray32ToWasm0(lr_0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray32ToWasm0(lr_1, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    _assertClass(delta, WasmPallasGAffine);
    var ptr2 = delta.ptr;
    delta.ptr = 0;
    var ptr3 = passArray8ToWasm0(z1, wasm.__wbindgen_malloc);
    var len3 = WASM_VECTOR_LEN;
    var ptr4 = passArray8ToWasm0(z2, wasm.__wbindgen_malloc);
    var len4 = WASM_VECTOR_LEN;
    _assertClass(sg, WasmPallasGAffine);
    var ptr5 = sg.ptr;
    sg.ptr = 0;
    var ret = wasm.wasmpastafqopeningproof_new(ptr0, len0, ptr1, len1, ptr2, ptr3, len3, ptr4, len4, ptr5);
    return WasmPastaFqOpeningProof.__wrap(ret);
  }
  get lr_0() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafqopeningproof_lr_0(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU32FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 4);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get lr_1() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafqopeningproof_lr_1(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU32FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 4);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get delta() {
    var ret = wasm.wasmpastafqopeningproof_delta(this.ptr);
    return WasmPallasGAffine.__wrap(ret);
  }
  get sg() {
    var ret = wasm.wasmpastafqopeningproof_sg(this.ptr);
    return WasmPallasGAffine.__wrap(ret);
  }
  set lr_0(lr_0) {
    var ptr0 = passArray32ToWasm0(lr_0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafqopeningproof_set_lr_0(this.ptr, ptr0, len0);
  }
  set lr_1(lr_1) {
    var ptr0 = passArray32ToWasm0(lr_1, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafqopeningproof_set_lr_1(this.ptr, ptr0, len0);
  }
  set delta(delta) {
    _assertClass(delta, WasmPallasGAffine);
    var ptr0 = delta.ptr;
    delta.ptr = 0;
    wasm.wasmpastafqopeningproof_set_delta(this.ptr, ptr0);
  }
  set sg(sg) {
    _assertClass(sg, WasmPallasGAffine);
    var ptr0 = sg.ptr;
    sg.ptr = 0;
    wasm.wasmpastafqopeningproof_set_sg(this.ptr, ptr0);
  }
};
var WasmPastaFqPlonkDomain = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFqPlonkDomain.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafqplonkdomain_free(ptr);
  }
  get log_size_of_group() {
    var ret = wasm.__wbg_get_wasmpastafpplonkdomain_log_size_of_group(this.ptr);
    return ret;
  }
  set log_size_of_group(arg0) {
    wasm.__wbg_set_wasmpastafpplonkdomain_log_size_of_group(this.ptr, arg0);
  }
  get group_gen() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmpastafqplonkdomain_group_gen(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set group_gen(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmpastafqplonkdomain_group_gen(this.ptr, ptr0, len0);
  }
  constructor(log_size_of_group, group_gen) {
    var ptr0 = passArray8ToWasm0(group_gen, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.wasmpastafqplonkdomain_new(log_size_of_group, ptr0, len0);
    return WasmPastaFqPlonkDomain.__wrap(ret);
  }
};
var WasmPastaFqPlonkGate = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFqPlonkGate.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafqplonkgate_free(ptr);
  }
  get typ() {
    var ret = wasm.__wbg_get_wasmpastafqplonkgate_typ(this.ptr);
    return ret >>> 0;
  }
  set typ(arg0) {
    wasm.__wbg_set_wasmpastafqplonkgate_typ(this.ptr, arg0);
  }
  get wires() {
    var ret = wasm.__wbg_get_wasmpastafqplonkgate_wires(this.ptr);
    return WasmPlonkWires.__wrap(ret);
  }
  set wires(arg0) {
    _assertClass(arg0, WasmPlonkWires);
    var ptr0 = arg0.ptr;
    arg0.ptr = 0;
    wasm.__wbg_set_wasmpastafqplonkgate_wires(this.ptr, ptr0);
  }
  constructor(typ, wires, c) {
    _assertClass(wires, WasmPlonkWires);
    var ptr0 = wires.ptr;
    wires.ptr = 0;
    var ptr1 = passArray8ToWasm0(c, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    var ret = wasm.wasmpastafqplonkgate_new(typ, ptr0, ptr1, len1);
    return WasmPastaFqPlonkGate.__wrap(ret);
  }
  get c() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafqplonkgate_c(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set c(c) {
    var ptr0 = passArray8ToWasm0(c, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafqplonkgate_set_c(this.ptr, ptr0, len0);
  }
};
var WasmPastaFqPlonkGateVector = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFqPlonkGateVector.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafqplonkgatevector_free(ptr);
  }
};
var WasmPastaFqPlonkIndex = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFqPlonkIndex.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafqplonkindex_free(ptr);
  }
};
var WasmPastaFqPlonkOracles = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFqPlonkOracles.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafqplonkoracles_free(ptr);
  }
  get o() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmpastafqplonkoracles_o(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set o(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmpastafqplonkoracles_o(this.ptr, ptr0, len0);
  }
  get p_eval0() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmpastafqplonkoracles_p_eval0(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set p_eval0(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmpastafqplonkoracles_p_eval0(this.ptr, ptr0, len0);
  }
  get p_eval1() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmpastafqplonkoracles_p_eval1(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set p_eval1(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmpastafqplonkoracles_p_eval1(this.ptr, ptr0, len0);
  }
  get digest_before_evaluations() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmpastafqplonkoracles_digest_before_evaluations(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set digest_before_evaluations(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmpastafqplonkoracles_digest_before_evaluations(this.ptr, ptr0, len0);
  }
  constructor(o, p_eval0, p_eval1, opening_prechallenges, digest_before_evaluations) {
    var ptr0 = passArray8ToWasm0(o, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(p_eval0, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    var ptr2 = passArray8ToWasm0(p_eval1, wasm.__wbindgen_malloc);
    var len2 = WASM_VECTOR_LEN;
    var ptr3 = passArray8ToWasm0(opening_prechallenges, wasm.__wbindgen_malloc);
    var len3 = WASM_VECTOR_LEN;
    var ptr4 = passArray8ToWasm0(digest_before_evaluations, wasm.__wbindgen_malloc);
    var len4 = WASM_VECTOR_LEN;
    var ret = wasm.wasmpastafqplonkoracles_new(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4);
    return WasmPastaFqPlonkOracles.__wrap(ret);
  }
  get opening_prechallenges() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafqplonkoracles_opening_prechallenges(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set opening_prechallenges(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafqplonkoracles_set_opening_prechallenges(this.ptr, ptr0, len0);
  }
};
var WasmPastaFqPlonkVerificationEvals = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFqPlonkVerificationEvals.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafqplonkverificationevals_free(ptr);
  }
  get sigma_comm0() {
    var ret = wasm.wasmpastafpplonkverificationevals_sigma_comm0(this.ptr);
    return WasmPastaPallasPolyComm.__wrap(ret);
  }
  get sigma_comm1() {
    var ret = wasm.wasmpastafpplonkverificationevals_sigma_comm1(this.ptr);
    return WasmPastaPallasPolyComm.__wrap(ret);
  }
  get sigma_comm2() {
    var ret = wasm.wasmpastafpplonkverificationevals_sigma_comm2(this.ptr);
    return WasmPastaPallasPolyComm.__wrap(ret);
  }
  get ql_comm() {
    var ret = wasm.wasmpastafpplonkverificationevals_ql_comm(this.ptr);
    return WasmPastaPallasPolyComm.__wrap(ret);
  }
  get qr_comm() {
    var ret = wasm.wasmpastafpplonkverificationevals_qr_comm(this.ptr);
    return WasmPastaPallasPolyComm.__wrap(ret);
  }
  get qo_comm() {
    var ret = wasm.wasmpastafpplonkverificationevals_qo_comm(this.ptr);
    return WasmPastaPallasPolyComm.__wrap(ret);
  }
  get qm_comm() {
    var ret = wasm.wasmpastafpplonkverificationevals_qm_comm(this.ptr);
    return WasmPastaPallasPolyComm.__wrap(ret);
  }
  get qc_comm() {
    var ret = wasm.wasmpastafpplonkverificationevals_qc_comm(this.ptr);
    return WasmPastaPallasPolyComm.__wrap(ret);
  }
  get rcm_comm0() {
    var ret = wasm.wasmpastafpplonkverificationevals_rcm_comm0(this.ptr);
    return WasmPastaPallasPolyComm.__wrap(ret);
  }
  get rcm_comm1() {
    var ret = wasm.wasmpastafpplonkverificationevals_rcm_comm1(this.ptr);
    return WasmPastaPallasPolyComm.__wrap(ret);
  }
  get rcm_comm2() {
    var ret = wasm.wasmpastafpplonkverificationevals_rcm_comm2(this.ptr);
    return WasmPastaPallasPolyComm.__wrap(ret);
  }
  get psm_comm() {
    var ret = wasm.wasmpastafpplonkverificationevals_psm_comm(this.ptr);
    return WasmPastaPallasPolyComm.__wrap(ret);
  }
  get add_comm() {
    var ret = wasm.wasmpastafpplonkverificationevals_add_comm(this.ptr);
    return WasmPastaPallasPolyComm.__wrap(ret);
  }
  get mul1_comm() {
    var ret = wasm.wasmpastafpplonkverificationevals_mul1_comm(this.ptr);
    return WasmPastaPallasPolyComm.__wrap(ret);
  }
  get mul2_comm() {
    var ret = wasm.wasmpastafpplonkverificationevals_mul2_comm(this.ptr);
    return WasmPastaPallasPolyComm.__wrap(ret);
  }
  get emul1_comm() {
    var ret = wasm.wasmpastafpplonkverificationevals_emul1_comm(this.ptr);
    return WasmPastaPallasPolyComm.__wrap(ret);
  }
  get emul2_comm() {
    var ret = wasm.wasmpastafpplonkverificationevals_emul2_comm(this.ptr);
    return WasmPastaPallasPolyComm.__wrap(ret);
  }
  get emul3_comm() {
    var ret = wasm.wasmpastafpplonkverificationevals_emul3_comm(this.ptr);
    return WasmPastaPallasPolyComm.__wrap(ret);
  }
  set sigma_comm0(x) {
    _assertClass(x, WasmPastaPallasPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_sigma_comm0(this.ptr, ptr0);
  }
  set sigma_comm1(x) {
    _assertClass(x, WasmPastaPallasPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_sigma_comm1(this.ptr, ptr0);
  }
  set sigma_comm2(x) {
    _assertClass(x, WasmPastaPallasPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_sigma_comm2(this.ptr, ptr0);
  }
  set ql_comm(x) {
    _assertClass(x, WasmPastaPallasPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_ql_comm(this.ptr, ptr0);
  }
  set qr_comm(x) {
    _assertClass(x, WasmPastaPallasPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_qr_comm(this.ptr, ptr0);
  }
  set qo_comm(x) {
    _assertClass(x, WasmPastaPallasPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_qo_comm(this.ptr, ptr0);
  }
  set qm_comm(x) {
    _assertClass(x, WasmPastaPallasPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_qm_comm(this.ptr, ptr0);
  }
  set qc_comm(x) {
    _assertClass(x, WasmPastaPallasPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_qc_comm(this.ptr, ptr0);
  }
  set rcm_comm0(x) {
    _assertClass(x, WasmPastaPallasPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_rcm_comm0(this.ptr, ptr0);
  }
  set rcm_comm1(x) {
    _assertClass(x, WasmPastaPallasPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_rcm_comm1(this.ptr, ptr0);
  }
  set rcm_comm2(x) {
    _assertClass(x, WasmPastaPallasPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_rcm_comm2(this.ptr, ptr0);
  }
  set psm_comm(x) {
    _assertClass(x, WasmPastaPallasPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_psm_comm(this.ptr, ptr0);
  }
  set add_comm(x) {
    _assertClass(x, WasmPastaPallasPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_add_comm(this.ptr, ptr0);
  }
  set mul1_comm(x) {
    _assertClass(x, WasmPastaPallasPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_mul1_comm(this.ptr, ptr0);
  }
  set mul2_comm(x) {
    _assertClass(x, WasmPastaPallasPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_mul2_comm(this.ptr, ptr0);
  }
  set emul1_comm(x) {
    _assertClass(x, WasmPastaPallasPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_emul1_comm(this.ptr, ptr0);
  }
  set emul2_comm(x) {
    _assertClass(x, WasmPastaPallasPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_emul2_comm(this.ptr, ptr0);
  }
  set emul3_comm(x) {
    _assertClass(x, WasmPastaPallasPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverificationevals_set_emul3_comm(this.ptr, ptr0);
  }
  constructor(sigma_comm0, sigma_comm1, sigma_comm2, ql_comm, qr_comm, qo_comm, qm_comm, qc_comm, rcm_comm0, rcm_comm1, rcm_comm2, psm_comm, add_comm, mul1_comm, mul2_comm, emul1_comm, emul2_comm, emul3_comm) {
    _assertClass(sigma_comm0, WasmPastaPallasPolyComm);
    _assertClass(sigma_comm1, WasmPastaPallasPolyComm);
    _assertClass(sigma_comm2, WasmPastaPallasPolyComm);
    _assertClass(ql_comm, WasmPastaPallasPolyComm);
    _assertClass(qr_comm, WasmPastaPallasPolyComm);
    _assertClass(qo_comm, WasmPastaPallasPolyComm);
    _assertClass(qm_comm, WasmPastaPallasPolyComm);
    _assertClass(qc_comm, WasmPastaPallasPolyComm);
    _assertClass(rcm_comm0, WasmPastaPallasPolyComm);
    _assertClass(rcm_comm1, WasmPastaPallasPolyComm);
    _assertClass(rcm_comm2, WasmPastaPallasPolyComm);
    _assertClass(psm_comm, WasmPastaPallasPolyComm);
    _assertClass(add_comm, WasmPastaPallasPolyComm);
    _assertClass(mul1_comm, WasmPastaPallasPolyComm);
    _assertClass(mul2_comm, WasmPastaPallasPolyComm);
    _assertClass(emul1_comm, WasmPastaPallasPolyComm);
    _assertClass(emul2_comm, WasmPastaPallasPolyComm);
    _assertClass(emul3_comm, WasmPastaPallasPolyComm);
    var ret = wasm.wasmpastafpplonkverificationevals_new(sigma_comm0.ptr, sigma_comm1.ptr, sigma_comm2.ptr, ql_comm.ptr, qr_comm.ptr, qo_comm.ptr, qm_comm.ptr, qc_comm.ptr, rcm_comm0.ptr, rcm_comm1.ptr, rcm_comm2.ptr, psm_comm.ptr, add_comm.ptr, mul1_comm.ptr, mul2_comm.ptr, emul1_comm.ptr, emul2_comm.ptr, emul3_comm.ptr);
    return WasmPastaFqPlonkVerificationEvals.__wrap(ret);
  }
};
var WasmPastaFqPlonkVerificationShifts = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFqPlonkVerificationShifts.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafqplonkverificationshifts_free(ptr);
  }
  get r() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmpastafqplonkdomain_group_gen(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set r(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmpastafqplonkdomain_group_gen(this.ptr, ptr0, len0);
  }
  get o() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmpastafqplonkverificationshifts_o(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set o(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmpastafqplonkverificationshifts_o(this.ptr, ptr0, len0);
  }
  constructor(r, o) {
    var ptr0 = passArray8ToWasm0(r, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(o, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    var ret = wasm.wasmpastafqplonkverificationshifts_new(ptr0, len0, ptr1, len1);
    return WasmPastaFqPlonkVerificationShifts.__wrap(ret);
  }
};
var WasmPastaFqPlonkVerifierIndex = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFqPlonkVerifierIndex.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafqplonkverifierindex_free(ptr);
  }
  get domain() {
    var ret = wasm.__wbg_get_wasmpastafpplonkverifierindex_domain(this.ptr);
    return WasmPastaFqPlonkDomain.__wrap(ret);
  }
  set domain(arg0) {
    _assertClass(arg0, WasmPastaFqPlonkDomain);
    var ptr0 = arg0.ptr;
    arg0.ptr = 0;
    wasm.__wbg_set_wasmpastafpplonkverifierindex_domain(this.ptr, ptr0);
  }
  get max_poly_size() {
    var ret = wasm.__wbg_get_wasmpastafpplonkverifierindex_max_poly_size(this.ptr);
    return ret;
  }
  set max_poly_size(arg0) {
    wasm.__wbg_set_wasmpastafpplonkverifierindex_max_poly_size(this.ptr, arg0);
  }
  get max_quot_size() {
    var ret = wasm.__wbg_get_wasmpastafpplonkverifierindex_max_quot_size(this.ptr);
    return ret;
  }
  set max_quot_size(arg0) {
    wasm.__wbg_set_wasmpastafpplonkverifierindex_max_quot_size(this.ptr, arg0);
  }
  get shifts() {
    var ret = wasm.__wbg_get_wasmpastafpplonkverifierindex_shifts(this.ptr);
    return WasmPastaFqPlonkVerificationShifts.__wrap(ret);
  }
  set shifts(arg0) {
    _assertClass(arg0, WasmPastaFqPlonkVerificationShifts);
    var ptr0 = arg0.ptr;
    arg0.ptr = 0;
    wasm.__wbg_set_wasmpastafpplonkverifierindex_shifts(this.ptr, ptr0);
  }
  constructor(domain, max_poly_size, max_quot_size, urs, evals, shifts) {
    _assertClass(domain, WasmPastaFqPlonkDomain);
    _assertClass(urs, WasmPastaFqUrs);
    _assertClass(evals, WasmPastaFqPlonkVerificationEvals);
    _assertClass(shifts, WasmPastaFqPlonkVerificationShifts);
    var ret = wasm.wasmpastafqplonkverifierindex_new(domain.ptr, max_poly_size, max_quot_size, urs.ptr, evals.ptr, shifts.ptr);
    return WasmPastaFqPlonkVerifierIndex.__wrap(ret);
  }
  get urs() {
    var ret = wasm.wasmpastafpplonkverifierindex_urs(this.ptr);
    return WasmPastaFqUrs.__wrap(ret);
  }
  set urs(x) {
    _assertClass(x, WasmPastaFqUrs);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafpplonkverifierindex_set_urs(this.ptr, ptr0);
  }
  get evals() {
    var ret = wasm.wasmpastafqplonkverifierindex_evals(this.ptr);
    return WasmPastaFqPlonkVerificationEvals.__wrap(ret);
  }
  set evals(x) {
    _assertClass(x, WasmPastaFqPlonkVerificationEvals);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafqplonkverifierindex_set_evals(this.ptr, ptr0);
  }
};
var WasmPastaFqProofEvaluations = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFqProofEvaluations.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafqproofevaluations_free(ptr);
  }
  constructor(l, r, o, z, t, f, sigma1, sigma2) {
    var ptr0 = passArray8ToWasm0(l, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(r, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    var ptr2 = passArray8ToWasm0(o, wasm.__wbindgen_malloc);
    var len2 = WASM_VECTOR_LEN;
    var ptr3 = passArray8ToWasm0(z, wasm.__wbindgen_malloc);
    var len3 = WASM_VECTOR_LEN;
    var ptr4 = passArray8ToWasm0(t, wasm.__wbindgen_malloc);
    var len4 = WASM_VECTOR_LEN;
    var ptr5 = passArray8ToWasm0(f, wasm.__wbindgen_malloc);
    var len5 = WASM_VECTOR_LEN;
    var ptr6 = passArray8ToWasm0(sigma1, wasm.__wbindgen_malloc);
    var len6 = WASM_VECTOR_LEN;
    var ptr7 = passArray8ToWasm0(sigma2, wasm.__wbindgen_malloc);
    var len7 = WASM_VECTOR_LEN;
    var ret = wasm.wasmpastafqproofevaluations_new(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7);
    return WasmPastaFqProofEvaluations.__wrap(ret);
  }
  get l() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafqproofevaluations_l(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get r() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafqproofevaluations_r(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get o() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafqproofevaluations_o(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get z() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafqproofevaluations_z(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get t() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafqproofevaluations_t(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get f() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafqproofevaluations_f(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get sigma1() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafqproofevaluations_sigma1(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get sigma2() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafqproofevaluations_sigma2(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set l(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafqproofevaluations_set_l(this.ptr, ptr0, len0);
  }
  set r(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafqproofevaluations_set_r(this.ptr, ptr0, len0);
  }
  set o(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafqproofevaluations_set_o(this.ptr, ptr0, len0);
  }
  set z(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafqproofevaluations_set_z(this.ptr, ptr0, len0);
  }
  set t(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafqproofevaluations_set_t(this.ptr, ptr0, len0);
  }
  set f(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafqproofevaluations_set_f(this.ptr, ptr0, len0);
  }
  set sigma1(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafqproofevaluations_set_sigma1(this.ptr, ptr0, len0);
  }
  set sigma2(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafqproofevaluations_set_sigma2(this.ptr, ptr0, len0);
  }
};
var WasmPastaFqProverCommitments = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFqProverCommitments.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafqprovercommitments_free(ptr);
  }
  constructor(l_comm, r_comm, o_comm, z_comm, t_comm) {
    _assertClass(l_comm, WasmPastaPallasPolyComm);
    var ptr0 = l_comm.ptr;
    l_comm.ptr = 0;
    _assertClass(r_comm, WasmPastaPallasPolyComm);
    var ptr1 = r_comm.ptr;
    r_comm.ptr = 0;
    _assertClass(o_comm, WasmPastaPallasPolyComm);
    var ptr2 = o_comm.ptr;
    o_comm.ptr = 0;
    _assertClass(z_comm, WasmPastaPallasPolyComm);
    var ptr3 = z_comm.ptr;
    z_comm.ptr = 0;
    _assertClass(t_comm, WasmPastaPallasPolyComm);
    var ptr4 = t_comm.ptr;
    t_comm.ptr = 0;
    var ret = wasm.wasmpastafqprovercommitments_new(ptr0, ptr1, ptr2, ptr3, ptr4);
    return WasmPastaFqProverCommitments.__wrap(ret);
  }
  get l_comm() {
    var ret = wasm.wasmpastafqprovercommitments_l_comm(this.ptr);
    return WasmPastaPallasPolyComm.__wrap(ret);
  }
  get r_comm() {
    var ret = wasm.wasmpastafqprovercommitments_r_comm(this.ptr);
    return WasmPastaPallasPolyComm.__wrap(ret);
  }
  get o_comm() {
    var ret = wasm.wasmpastafqprovercommitments_o_comm(this.ptr);
    return WasmPastaPallasPolyComm.__wrap(ret);
  }
  get z_comm() {
    var ret = wasm.wasmpastafqprovercommitments_z_comm(this.ptr);
    return WasmPastaPallasPolyComm.__wrap(ret);
  }
  get t_comm() {
    var ret = wasm.wasmpastafqprovercommitments_t_comm(this.ptr);
    return WasmPastaPallasPolyComm.__wrap(ret);
  }
  set l_comm(x) {
    _assertClass(x, WasmPastaPallasPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafqprovercommitments_set_l_comm(this.ptr, ptr0);
  }
  set r_comm(x) {
    _assertClass(x, WasmPastaPallasPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafqprovercommitments_set_r_comm(this.ptr, ptr0);
  }
  set o_comm(x) {
    _assertClass(x, WasmPastaPallasPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafqprovercommitments_set_o_comm(this.ptr, ptr0);
  }
  set z_comm(x) {
    _assertClass(x, WasmPastaPallasPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafqprovercommitments_set_z_comm(this.ptr, ptr0);
  }
  set t_comm(x) {
    _assertClass(x, WasmPastaPallasPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmpastafqprovercommitments_set_t_comm(this.ptr, ptr0);
  }
};
var WasmPastaFqProverProof = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFqProverProof.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafqproverproof_free(ptr);
  }
  constructor(commitments, proof, evals0, evals1, public_, prev_challenges_scalars, prev_challenges_comms) {
    _assertClass(commitments, WasmPastaFqProverCommitments);
    var ptr0 = commitments.ptr;
    commitments.ptr = 0;
    _assertClass(proof, WasmPastaFqOpeningProof);
    var ptr1 = proof.ptr;
    proof.ptr = 0;
    _assertClass(evals0, WasmPastaFqProofEvaluations);
    var ptr2 = evals0.ptr;
    evals0.ptr = 0;
    _assertClass(evals1, WasmPastaFqProofEvaluations);
    var ptr3 = evals1.ptr;
    evals1.ptr = 0;
    var ptr4 = passArray8ToWasm0(public_, wasm.__wbindgen_malloc);
    var len4 = WASM_VECTOR_LEN;
    _assertClass(prev_challenges_scalars, WasmVecVecPastaFq);
    var ptr5 = prev_challenges_scalars.ptr;
    prev_challenges_scalars.ptr = 0;
    var ptr6 = passArray32ToWasm0(prev_challenges_comms, wasm.__wbindgen_malloc);
    var len6 = WASM_VECTOR_LEN;
    var ret = wasm.wasmpastafqproverproof_new(ptr0, ptr1, ptr2, ptr3, ptr4, len4, ptr5, ptr6, len6);
    return WasmPastaFqProverProof.__wrap(ret);
  }
  get commitments() {
    var ret = wasm.wasmpastafqproverproof_commitments(this.ptr);
    return WasmPastaFqProverCommitments.__wrap(ret);
  }
  get proof() {
    var ret = wasm.wasmpastafqproverproof_proof(this.ptr);
    return WasmPastaFqOpeningProof.__wrap(ret);
  }
  get evals0() {
    var ret = wasm.wasmpastafqproverproof_evals0(this.ptr);
    return WasmPastaFqProofEvaluations.__wrap(ret);
  }
  get evals1() {
    var ret = wasm.wasmpastafqproverproof_evals1(this.ptr);
    return WasmPastaFqProofEvaluations.__wrap(ret);
  }
  get public_() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafqproverproof_public_(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get prev_challenges_scalars() {
    var ret = wasm.wasmpastafqproverproof_prev_challenges_scalars(this.ptr);
    return WasmVecVecPastaFq.__wrap(ret);
  }
  get prev_challenges_comms() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastafqproverproof_prev_challenges_comms(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU32FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 4);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set commitments(commitments) {
    _assertClass(commitments, WasmPastaFqProverCommitments);
    var ptr0 = commitments.ptr;
    commitments.ptr = 0;
    wasm.wasmpastafqproverproof_set_commitments(this.ptr, ptr0);
  }
  set proof(proof) {
    _assertClass(proof, WasmPastaFqOpeningProof);
    var ptr0 = proof.ptr;
    proof.ptr = 0;
    wasm.wasmpastafqproverproof_set_proof(this.ptr, ptr0);
  }
  set evals0(evals0) {
    _assertClass(evals0, WasmPastaFqProofEvaluations);
    var ptr0 = evals0.ptr;
    evals0.ptr = 0;
    wasm.wasmpastafqproverproof_set_evals0(this.ptr, ptr0);
  }
  set evals1(evals1) {
    _assertClass(evals1, WasmPastaFqProofEvaluations);
    var ptr0 = evals1.ptr;
    evals1.ptr = 0;
    wasm.wasmpastafqproverproof_set_evals1(this.ptr, ptr0);
  }
  set public_(public_) {
    var ptr0 = passArray8ToWasm0(public_, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafqproverproof_set_public_(this.ptr, ptr0, len0);
  }
  set prev_challenges_scalars(prev_challenges_scalars) {
    _assertClass(prev_challenges_scalars, WasmVecVecPastaFq);
    var ptr0 = prev_challenges_scalars.ptr;
    prev_challenges_scalars.ptr = 0;
    wasm.wasmpastafqproverproof_set_prev_challenges_scalars(this.ptr, ptr0);
  }
  set prev_challenges_comms(prev_challenges_comms) {
    var ptr0 = passArray32ToWasm0(prev_challenges_comms, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastafqproverproof_set_prev_challenges_comms(this.ptr, ptr0, len0);
  }
};
var WasmPastaFqUrs = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFqUrs.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafqurs_free(ptr);
  }
};
var WasmPastaPallasPolyComm = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaPallasPolyComm.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastapallaspolycomm_free(ptr);
  }
  get shifted() {
    var ret = wasm.__wbg_get_wasmpastapallaspolycomm_shifted(this.ptr);
    return ret === 0 ? void 0 : WasmPallasGAffine.__wrap(ret);
  }
  set shifted(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, WasmPallasGAffine);
      ptr0 = arg0.ptr;
      arg0.ptr = 0;
    }
    wasm.__wbg_set_wasmpastapallaspolycomm_shifted(this.ptr, ptr0);
  }
  constructor(unshifted, shifted) {
    var ptr0 = passArray32ToWasm0(unshifted, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    let ptr1 = 0;
    if (!isLikeNone(shifted)) {
      _assertClass(shifted, WasmPallasGAffine);
      ptr1 = shifted.ptr;
      shifted.ptr = 0;
    }
    var ret = wasm.wasmpastapallaspolycomm_new(ptr0, len0, ptr1);
    return WasmPastaPallasPolyComm.__wrap(ret);
  }
  get unshifted() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastapallaspolycomm_unshifted(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU32FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 4);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set unshifted(x) {
    var ptr0 = passArray32ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastapallaspolycomm_set_unshifted(this.ptr, ptr0, len0);
  }
};
var WasmPastaVestaPolyComm = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaVestaPolyComm.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastavestapolycomm_free(ptr);
  }
  get shifted() {
    var ret = wasm.__wbg_get_wasmpastapallaspolycomm_shifted(this.ptr);
    return ret === 0 ? void 0 : WasmVestaGAffine.__wrap(ret);
  }
  set shifted(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, WasmVestaGAffine);
      ptr0 = arg0.ptr;
      arg0.ptr = 0;
    }
    wasm.__wbg_set_wasmpastapallaspolycomm_shifted(this.ptr, ptr0);
  }
  constructor(unshifted, shifted) {
    var ptr0 = passArray32ToWasm0(unshifted, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    let ptr1 = 0;
    if (!isLikeNone(shifted)) {
      _assertClass(shifted, WasmVestaGAffine);
      ptr1 = shifted.ptr;
      shifted.ptr = 0;
    }
    var ret = wasm.wasmpastavestapolycomm_new(ptr0, len0, ptr1);
    return WasmPastaVestaPolyComm.__wrap(ret);
  }
  get unshifted() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmpastavestapolycomm_unshifted(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU32FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 4);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set unshifted(x) {
    var ptr0 = passArray32ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmpastavestapolycomm_set_unshifted(this.ptr, ptr0, len0);
  }
};
var WasmPlonkWire = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPlonkWire.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmplonkwire_free(ptr);
  }
  get row() {
    var ret = wasm.__wbg_get_wasmplonkwire_row(this.ptr);
    return ret;
  }
  set row(arg0) {
    wasm.__wbg_set_wasmplonkwire_row(this.ptr, arg0);
  }
  get col() {
    var ret = wasm.__wbg_get_wasmplonkwire_col(this.ptr);
    return ret >>> 0;
  }
  set col(arg0) {
    wasm.__wbg_set_wasmplonkwire_col(this.ptr, arg0);
  }
  constructor(row, col) {
    var ret = wasm.wasmplonkwire_new(row, col);
    return WasmPlonkWire.__wrap(ret);
  }
};
var WasmPlonkWires = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPlonkWires.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmplonkwires_free(ptr);
  }
  get row() {
    var ret = wasm.__wbg_get_wasmplonkwire_row(this.ptr);
    return ret;
  }
  set row(arg0) {
    wasm.__wbg_set_wasmplonkwire_row(this.ptr, arg0);
  }
  get l() {
    var ret = wasm.__wbg_get_wasmplonkwires_l(this.ptr);
    return WasmPlonkWire.__wrap(ret);
  }
  set l(arg0) {
    _assertClass(arg0, WasmPlonkWire);
    var ptr0 = arg0.ptr;
    arg0.ptr = 0;
    wasm.__wbg_set_wasmplonkwires_l(this.ptr, ptr0);
  }
  get r() {
    var ret = wasm.__wbg_get_wasmplonkwires_r(this.ptr);
    return WasmPlonkWire.__wrap(ret);
  }
  set r(arg0) {
    _assertClass(arg0, WasmPlonkWire);
    var ptr0 = arg0.ptr;
    arg0.ptr = 0;
    wasm.__wbg_set_wasmplonkwires_r(this.ptr, ptr0);
  }
  get o() {
    var ret = wasm.__wbg_get_wasmplonkwires_o(this.ptr);
    return WasmPlonkWire.__wrap(ret);
  }
  set o(arg0) {
    _assertClass(arg0, WasmPlonkWire);
    var ptr0 = arg0.ptr;
    arg0.ptr = 0;
    wasm.__wbg_set_wasmplonkwires_o(this.ptr, ptr0);
  }
  constructor(row, l, r, o) {
    _assertClass(l, WasmPlonkWire);
    var ptr0 = l.ptr;
    l.ptr = 0;
    _assertClass(r, WasmPlonkWire);
    var ptr1 = r.ptr;
    r.ptr = 0;
    _assertClass(o, WasmPlonkWire);
    var ptr2 = o.ptr;
    o.ptr = 0;
    var ret = wasm.wasmplonkwires_new(row, ptr0, ptr1, ptr2);
    return WasmPlonkWires.__wrap(ret);
  }
};
var WasmVecVecPallasPolyComm = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmVecVecPallasPolyComm.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmvecvecpallaspolycomm_free(ptr);
  }
  constructor(n) {
    var ret = wasm.wasmvecvecpallaspolycomm_create(n);
    return WasmVecVecPallasPolyComm.__wrap(ret);
  }
  push(x) {
    var ptr0 = passArray32ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmvecvecpallaspolycomm_push(this.ptr, ptr0, len0);
  }
};
var WasmVecVecPastaFp = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmVecVecPastaFp.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmvecvecpastafp_free(ptr);
  }
  constructor(n) {
    var ret = wasm.wasmvecvecpastafp_create(n);
    return WasmVecVecPastaFp.__wrap(ret);
  }
  push(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmvecvecpastafp_push(this.ptr, ptr0, len0);
  }
  get(i) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmvecvecpastafp_get(retptr, this.ptr, i);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set(i, x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmvecvecpastafp_set(this.ptr, i, ptr0, len0);
  }
};
var WasmVecVecPastaFq = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmVecVecPastaFq.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmvecvecpastafq_free(ptr);
  }
  constructor(n) {
    var ret = wasm.wasmvecvecpallaspolycomm_create(n);
    return WasmVecVecPastaFq.__wrap(ret);
  }
  push(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmvecvecpastafq_push(this.ptr, ptr0, len0);
  }
  get(i) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmvecvecpastafq_get(retptr, this.ptr, i);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set(i, x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmvecvecpastafq_set(this.ptr, i, ptr0, len0);
  }
};
var WasmVecVecVestaPolyComm = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmVecVecVestaPolyComm.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmvecvecvestapolycomm_free(ptr);
  }
  constructor(n) {
    var ret = wasm.wasmvecvecpastafp_create(n);
    return WasmVecVecVestaPolyComm.__wrap(ret);
  }
  push(x) {
    var ptr0 = passArray32ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmvecvecvestapolycomm_push(this.ptr, ptr0, len0);
  }
};
var WasmVestaGAffine = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmVestaGAffine.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmvestagaffine_free(ptr);
  }
  get x() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmvestagaffine_x(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set x(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmvestagaffine_x(this.ptr, ptr0, len0);
  }
  get y() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmvestagaffine_y(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set y(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmvestagaffine_y(this.ptr, ptr0, len0);
  }
  get infinity() {
    var ret = wasm.__wbg_get_wasmpallasgaffine_infinity(this.ptr);
    return ret !== 0;
  }
  set infinity(arg0) {
    wasm.__wbg_set_wasmpallasgaffine_infinity(this.ptr, arg0);
  }
};
var WasmVestaGProjective = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmVestaGProjective.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmvestagprojective_free(ptr);
  }
};
var wbg_rayon_PoolBuilder = class {
  static __wrap(ptr) {
    const obj = Object.create(wbg_rayon_PoolBuilder.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wbg_rayon_poolbuilder_free(ptr);
  }
  mainJS() {
    var ret = wasm.wbg_rayon_poolbuilder_mainJS(this.ptr);
    return takeObject(ret);
  }
  numThreads() {
    var ret = wasm.wbg_rayon_poolbuilder_numThreads(this.ptr);
    return ret >>> 0;
  }
  receiver() {
    var ret = wasm.wbg_rayon_poolbuilder_receiver(this.ptr);
    return ret;
  }
  build() {
    wasm.wbg_rayon_poolbuilder_build(this.ptr);
  }
};
async function load(module, imports) {
  if (typeof Response === "function" && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        if (module.headers.get("Content-Type") != "application/wasm") {
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
        } else {
          throw e;
        }
      }
    }
    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);
    if (instance instanceof WebAssembly.Instance) {
      return { instance, module };
    } else {
      return instance;
    }
  }
}
async function init(input, maybe_memory) {
  if (typeof input === "undefined") {
    input = plonk_wasm_bg_default;
  }
  const imports = {};
  imports.wbg = {};
  imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
    var ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_alert_b014848fc9035c81 = function(arg0, arg1) {
    alert(getStringFromWasm0(arg0, arg1));
  };
  imports.wbg.__wbg_log_19fef73d9a645b72 = function(arg0, arg1) {
    console.log(getStringFromWasm0(arg0, arg1));
  };
  imports.wbg.__wbg_self_86b4b13392c7af56 = function() {
    return handleError(function() {
      var ret = self.self;
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
  };
  imports.wbg.__wbg_require_f5521a5b85ad2542 = function(arg0, arg1, arg2) {
    var ret = getObject(arg0).require(getStringFromWasm0(arg1, arg2));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_crypto_b8c92eaac23d0d80 = function(arg0) {
    var ret = getObject(arg0).crypto;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_msCrypto_9ad6677321a08dd8 = function(arg0) {
    var ret = getObject(arg0).msCrypto;
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_is_undefined = function(arg0) {
    var ret = getObject(arg0) === void 0;
    return ret;
  };
  imports.wbg.__wbg_getRandomValues_dd27e6b0652b3236 = function(arg0) {
    var ret = getObject(arg0).getRandomValues;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_getRandomValues_e57c9b75ddead065 = function(arg0, arg1) {
    getObject(arg0).getRandomValues(getObject(arg1));
  };
  imports.wbg.__wbg_randomFillSync_d2ba53160aec6aba = function(arg0, arg1, arg2) {
    getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
  };
  imports.wbg.__wbg_static_accessor_MODULE_452b4680e8614c81 = function() {
    var ret = module;
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
    var ret = getObject(arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_buffer_397eaa4d72ee94dd = function(arg0) {
    var ret = getObject(arg0).buffer;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_a7ce447f15ff496f = function(arg0) {
    var ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_set_969ad0a60e51d320 = function(arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
  };
  imports.wbg.__wbg_length_1eb8fc608a0d4cdb = function(arg0) {
    var ret = getObject(arg0).length;
    return ret;
  };
  imports.wbg.__wbg_newwithlength_929232475839a482 = function(arg0) {
    var ret = new Uint8Array(arg0 >>> 0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_subarray_8b658422a224f479 = function(arg0, arg1, arg2) {
    var ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
  };
  imports.wbg.__wbindgen_rethrow = function(arg0) {
    throw takeObject(arg0);
  };
  imports.wbg.__wbindgen_module = function() {
    var ret = init.__wbindgen_wasm_module;
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_memory = function() {
    var ret = wasm.memory;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_static_accessor_URL_b24f10c24510da94 = function() {
    var ret = CDN_LOCATION;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_startWorkers_3e6644f7fc0ac450 = function(arg0, arg1, arg2) {
    var ret = startWorkers(takeObject(arg0), takeObject(arg1), wbg_rayon_PoolBuilder.__wrap(arg2));
    return addHeapObject(ret);
  };
  if (typeof input === "string" || typeof Request === "function" && input instanceof Request || typeof URL === "function" && input instanceof URL) {
    input = fetch(input);
  }
  imports.wbg.memory = maybe_memory || new WebAssembly.Memory({ initial: 18, maximum: 16384, shared: true });
  const { instance, module } = await load(await input, imports);
  wasm = instance.exports;
  init.__wbindgen_wasm_module = module;
  wasm.__wbindgen_start();
  return wasm;
}
var plonk_wasm_esbuild_default = init;