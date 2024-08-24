import { useNavigate } from "@remix-run/react";
import { CircleDotIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { MODULE_COMMAND_MENU, SIDEBAR_TOP_MENU } from "~/utils/const";
import { cn } from "~/utils/utils";

export function CommandMenu({ ...props }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-full justify-start rounded-[0.5rem] bg-white/70 text-sm font-normal text-muted-foreground border-white/20 shadow-none sm:pr-12 md:w-40 lg:w-64",
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="inline-flex">Search... </span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="User Menu">
            {SIDEBAR_TOP_MENU.map((navItem) => (
              <CommandItem
                key={navItem.to}
                value={navItem.title}
                onSelect={() => {
                  runCommand(() => navigate(navItem.to));
                }}
              >
                <CircleDotIcon className="mr-2 h-4 w-4" />
                {navItem.title}
              </CommandItem>
            ))}
          </CommandGroup>
          {MODULE_COMMAND_MENU.map((group) => (
            <CommandGroup key={group.category} heading={group.category}>
              {group.items.map((navItem) => (
                <CommandItem
                  key={`@${group.category}-${navItem.to}`}
                  value={navItem.title}
                  onSelect={() => runCommand(() => navigate(navItem.to))}
                >
                  <div className="mr-2 flex h-4 w-4 items-center justify-center">
                    <navItem.icon className="h-3 w-3" />
                  </div>
                  {navItem.title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
