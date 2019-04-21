import { connect } from "react-redux";
import Navigation from "./Navigation";

const mapStateToProps = state => ({
  title: state.title.title
});

export default connect(
  mapStateToProps,
  null
)(Navigation);
