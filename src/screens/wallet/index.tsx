import './index.css';
import Content from "./components/Content";
import Header from "./components/Header";

const Wallet = () => {
  return (
    <div className="flex items-center justify-center">
    <div className="w-full max-w-4xl self-center">
      <div className="w-full bg-gray-300" style={{height:'100vh'}}>
              <Header />
              <Content/>
        </div>
        </div>

    </div>
  );
};

export default Wallet;
