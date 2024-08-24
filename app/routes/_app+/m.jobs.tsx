import { EmptyModule } from "~/components/EmptyModule";
import {
  ModuleContainer,
  ModuleContent,
  ModuleHeader,
} from "~/components/module";

export default function Page() {
  return (
    <ModuleContainer>
      <ModuleHeader />
      <ModuleContent>
        <EmptyModule />
      </ModuleContent>
    </ModuleContainer>
  );
}
