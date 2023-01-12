import { TokenDataType } from "../../ViewToken/ViewToken";
import "../index.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export type ContentProps = {
  tokenList: TokenDataType[];
};

const Content = ({ tokenList }: ContentProps) => {
  return (
    <div className="content">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>My Digital Twins</div>
        <div className="d-flex title-right">
          <span>View More</span>
          <div className="button">
            <NavigateNextIcon />
          </div>
        </div>
      </div>
      <div className="slice" />

      <div className="item">
        <div className="d-flex">
          <img
            className="image"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKr5wT7rfkjkGvNeqgXjBmarC5ZNoZs-H2uMpML8O7Q4F9W-IlUQibBT6IPqyvX45NOgw&usqp=CAU"
            alt="test"
            width={200}
            height={200}
          />
          <div className="center-vertical">
            <div style={{ marginLeft: 20 }}>
              <div>Kaju King</div>
              <div>Jabc description</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
