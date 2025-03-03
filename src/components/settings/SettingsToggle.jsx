import Tooltip from "../ui/Tooltip.jsx";

const SettingToggle = ({
  icon: Icon,
  title,
  value,
  onChange,
  description,
  beta,
}) => (
  <div className="group relative flex flex-col items-start justify-between gap-4 rounded-xl border-[1px] border-white/[0.05] bg-white/[0.02] px-4 py-4 transition-all hover:bg-white/[0.04] sm:flex-row sm:items-center sm:gap-0 sm:px-6">
    <div className="flex w-full items-start gap-4 sm:w-auto sm:items-center">
      <div className="group-hover:bg-primary/20 group-hover:text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/80 transition-all">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1 sm:flex-auto">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="group-hover:text-primary text-sm font-medium text-white/90 transition-all sm:text-base">
            {title}
          </h3>
          {beta && (
            <Tooltip content="This feature is in beta and may not work correctly">
              <span className="bg-primary/20 text-primary rounded-md px-2 py-0.5 text-xs font-semibold tracking-wide uppercase">
                Beta
              </span>
            </Tooltip>
          )}
        </div>
        {description && (
          <p className="mt-1 line-clamp-2 text-xs text-white/50 sm:text-sm">
            {description}
          </p>
        )}
      </div>
    </div>
    <div
      onClick={onChange}
      className="relative inline-flex cursor-pointer items-center self-end transition-all duration-300 ease-in sm:self-center"
    >
      <div className="h-3 w-12 rounded-full border-[1px] border-white/[0.05]"></div>
      <div
        className={`${value ? "bg-primary right-0" : "left-0 bg-white"} absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full transition-all duration-300 ease-in`}
      ></div>
    </div>
  </div>
);

export default SettingToggle;
