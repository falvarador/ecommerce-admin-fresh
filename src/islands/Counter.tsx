import type { Signal } from "@preact/signals";
import { Button, Input } from "@/src/components/ui/index.ts";
import { Label } from "@/src/components/ui/label.tsx";

interface CounterProps {
  count: Signal<number>;
}

export default function Counter(props: CounterProps) {
  return (
    <div class="flex gap-8 py-6">
      <Button variant="secondary" onClick={() => props.count.value -= 1}>
        -1
      </Button>
      <p class="text-3xl">{props.count}</p>
      <Button onClick={() => props.count.value += 1}>+1</Button>
      <div>
        <Label>Demo</Label>
        <Input></Input>
      </div>
    </div>
  );
}
