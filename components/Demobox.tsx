import { ComponentChildren } from "preact";

export const DemoBox = (
  { name, children }: { name: string; children: ComponentChildren },
) => {
  return (
    <div>
      <h1 class="text-center mt-5 text-2xl font-bold">{name}</h1>
      <div class="flex m-5 p-5 border border-gray-200 rounded bg-gray-50">
        <div class="m-auto bg-white">{children}</div>
      </div>
    </div>
  );
}

export const MultiBox = (
  { name, children }: { name: string; children: ComponentChildren },
) => {
  return (
    <div>
      <h1 class="text-center mt-5 text-2xl font-bold">{name}</h1>
      <div class="flex m-5 p-5 border border-gray-200 rounded bg-gray-50 gap-5 flex-wrap">
        {children}
      </div>
    </div>
  );
}

export const DemoItem = (
  { children }: { children: ComponentChildren },
) => {
  return (
    <div class="m-auto bg-white">{children}</div>
  );
}