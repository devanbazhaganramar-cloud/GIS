import UIContainer from "../helpers/ui-components/ui-flex-container";
import UIButton from "../helpers/ui-components/ui-button";
import ThemeToggle from "./app-theme";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AppHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-base-100 text-base-content shadow-sm sticky top-0 z-50">
      <UIContainer justify="end" align="center" className="px-6 py-3">
        <UIButton
          prefix={<Home size={20} />}
          title="Home"
          onClick={() => navigate("/")}
          className="bg-base-200 hover:bg-base-300"
        />
        <ThemeToggle />
      </UIContainer>
    </div>
  );
};

export default AppHeader;
