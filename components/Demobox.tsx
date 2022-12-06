import { JSX } from "https://esm.sh/v95/preact@10.11.0/jsx-runtime/src/index.d.ts";

export default function (
  { name, children }: { name: string; children: JSX.Element },
) {
  return (
    <div>
      <h1 class="text-center mt-5 text-2xl font-bold">{name}</h1>
      <div class="flex m-5 p-5 border border-gray-200 rounded bg-gray-50">
        <div class="m-auto bg-white">{children}</div>
      </div>
    </div>
  );
}
