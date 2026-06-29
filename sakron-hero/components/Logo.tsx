export default function Logo() {
  return (
    <div className="relative h-8 w-9 shrink-0" aria-hidden="true">
      <span
        className="absolute left-0 top-[3px] block h-[11px] w-[26px] rounded-full bg-acid"
        style={{ clipPath: "polygon(0% 0%, 70% 0%, 100% 100%, 30% 100%)" }}
      />
      <span
        className="absolute bottom-[3px] right-0 block h-[11px] w-[26px] rounded-full bg-acid"
        style={{ clipPath: "polygon(0% 0%, 70% 0%, 100% 100%, 30% 100%)" }}
      />
    </div>
  );
}
