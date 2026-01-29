import { cn } from '@/lib/utils';

export type ThemeItemProps = {
  theme: { name: string; img: string };
  className?: string;
  onClick?: () => void;
};

const ThemeItem = ({ theme, className, onClick }: ThemeItemProps) => {
  return (
    <div
      className={cn(
        'flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 transition-colors',
        className
      )}
      onClick={onClick}
    >
      <div className="size-6 shrink-0 rounded border">
        <img src={theme.img} alt={theme.name} className="h-full w-full rounded object-contain" />
      </div>
      <span className="whitespace-nowrap">{theme.name}</span>
    </div>
  );
};

export default ThemeItem;
