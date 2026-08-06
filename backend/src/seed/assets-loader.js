import { fileURLToPath } from "node:url";

const IMAGE_EXT = /\.(png|jpe?g|gif|svg|webp|avif)$/i;

export async function resolve(specifier, context, nextResolve) {
  if (IMAGE_EXT.test(specifier)) {
    let url;
    try {
      url = new URL(specifier, context.parentURL).href;
    } catch {
      return nextResolve(specifier, context);
    }
    return { shortCircuit: true, url };
  }
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (IMAGE_EXT.test(url)) {
    return {
      format: "module",
      shortCircuit: true,
      source: `export default ${JSON.stringify(fileURLToPath(url))};`,
    };
  }
  return nextLoad(url, context);
}
