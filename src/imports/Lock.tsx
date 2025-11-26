import svgPaths from "./svg-45ejq7z4ga";

function Frame() {
  return (
    <div className="absolute aspect-[24/24] left-0 overflow-clip right-0 top-0" data-name="Frame">
      <div className="absolute inset-[4.17%_16.67%_8.33%_16.67%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
          <path d={svgPaths.p2adb31b0} fill="var(--fill-0, #F9FFA7)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

export default function Lock() {
  return (
    <div className="relative size-full" data-name="lock">
      <Frame />
    </div>
  );
}