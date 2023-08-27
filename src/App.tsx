import { ConfigProvider } from "antd";
import AppRouter from './routers';
import colors from "./constants/colors";

const App = () => {
  return (
    <>
      <ConfigProvider theme={{
        token: {
          colorPrimary: colors.primary
        }
      }}>
        <AppRouter />
      </ConfigProvider>
    </>
  )
}

export default App;