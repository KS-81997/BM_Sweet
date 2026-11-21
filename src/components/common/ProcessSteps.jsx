import { business } from "../../data/business";
import { useSettings } from "../../hooks/useSettings";

export default function ProcessSteps() {
  const { loc } = useSettings();
  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {business.processSteps.map((s, i) => (
        <li key={i} className="card p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-saffron-500 font-bold text-white">{i + 1}</span>
          <h3 className="mt-3 text-lg font-bold">{loc(s.title)}</h3>
          <p className="mt-1 text-sm text-brown-700">{loc(s.text)}</p>
        </li>
      ))}
    </ol>
  );
}
