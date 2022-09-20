import React from "react";
import { Button, Header } from "../components";
import writeNutritionData from "../components/Firebase/writeNutritionData";
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth } from "firebase/auth";

var uid = "";
var u_name = "";


class Nutrition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fv: 0,
    };

    this.handleAmountUpdate = this.handleAmountUpdate.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  handleAmountUpdate(e) {
    this.setState({
      fv: e.target.value,
    });
  }

  submitData() {
    if (this.state.fv < 0) {
      alert("Please enter valid data!");
    } else {
      writeNutritionData(uid, u_name, this.state);
    }
  }

  render() {
    const auth = getAuth();
    const user = auth.currentUser;
    //console.log(user);
    uid = user.uid;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `profile/${user["uid"]}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          //console.log(snapshot.val());
          u_name = snapshot.val().displayname;
          //console.log(u_name);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header
          category="Page"
          title="Self-Report Portal: Nutrition Registor"
        />

        <div id="Nutrition Registor" className="text-2xl">
          <b>
            The national recommendations are for adults to consume at least
            5 cups of fruits/vegetables (F/V) per day
          </b>
          <br />
          <br />
          <label>
            The amount I have consumed of fruits/vegetables today:
          </label>
          <br />
          <input
            className="border-2 border-slate-500"
            type="text"
            name="fv"
            id="fv"
            onChange={this.handleAmountUpdate}
            required
          />{" "}
          cups
        </div>

        <br />
        <button
          style={{ backgroundColor: "#8AABBD" }}
          className=" btn btn-secondary border-2 border-slate-500 text-2xl"
          onClick={this.submitData}
        >
          Confirm and Submit
        </button>
      </div>
    );
  }
}

export default Nutrition;
