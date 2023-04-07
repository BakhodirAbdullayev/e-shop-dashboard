import Layout from "./components/Layout/Layout";
import RoutesWrapper from "./Routes";
import { ConfigProvider } from "antd";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { useUser } from "./utils/state";
import { useGetData } from "./utils/hooks";
import FirstLoad from "./components/FirstLoad";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    lng: localStorage.getItem("lang") || "en",
    support: ["en", "uz", "ru"],
    fallbacklang: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["htmlTag", "cookie", "localStorage", "subdomain", "path"],
      cashes: ["cookie"],
    },
    backend: {
      loadPath: "./translation/{{lng}}/tr.json",
    },
    react: { useSuspence: false },
  });

function App() {
  const setUser = useUser((s) => s.setUser);
  const userData = useGetData(["userGetMe"], "/user/me", {
    onSuccess: (d) => {
      setUser(d);
    },
  });

  return (
    <>
      {userData.isLoading ? (
        <FirstLoad />
      ) : (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#3a6963",
            },
          }}
        >
          <div className="App">
            <Layout>
              <RoutesWrapper />
            </Layout>
          </div>
        </ConfigProvider>
      )}
    </>
  );
}

export default App;
