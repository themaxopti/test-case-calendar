import moment from "moment";

export const Header = (props: any) => {
  return (
    <div
      style={{
        height: "45px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#F5F6FA",
        padding: "0px",
      }}
    >
      <div>{props.label.toUpperCase()}</div>
    </div>
  );
};

export const WeekHeader = (props: any) => {
  return (
    <div
      style={{
        width: "100%",
        height: "45px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#F5F6FA",
        padding: "0px",
      }}
    >
      <div>
        <strong>{moment(props.date).format("ddd MM/DD")}</strong>
      </div>
    </div>
  );
};
