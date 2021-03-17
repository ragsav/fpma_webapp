const CustomButton = (props) => {
  <Button
    variant="dark"
    type="submit"
    style={{
      padding: "2px 16px 2px 16px",
      fontSize: 12,
      margin: 0,
      marginRight: 20,
    }}
    onClick={() => setModalShow(true)}
  >
    {props.children}
  </Button>;
};
