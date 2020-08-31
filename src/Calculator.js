import React, { Component } from "react";
import { DateInput, NumberInput } from "./Input.js";
import { Badge, Button } from "react-bootstrap";
import axios from "axios";
import PieChart from "./PieChart.js";

const apiEndPointURL = "https://edelmetallbackend.herokuapp.com/investment/";

function rendite(w1, w2) {
  if (!(typeof w1 == "number") || !(typeof w2 == "number")) return "???";
  let r = (w2 / w1) * 100 - 100;

  r = Math.round(r * 100) / 100;
  return r;
  //return r.toLocaleString("de-DE");
}

function renditeString(r) {
  if (!(typeof r == "number")) return "???";
  let rstr =
    (r > 0 ? "+" : r < 0 ? "" : "+-") + r.toLocaleString("de-DE") + " %";

  let cls = r > 0 ? "success" : r < 0 ? "danger" : "secondary";
  return <Badge variant={cls}>{rstr}</Badge>;
}

function formatMoney(n) {
  if (!(typeof n == "number")) return "???";
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(n);
}

export default class Calculator extends Component {
  constructor(props) {
    super(props);

    this.callAPIandGetReturn = this.callAPIandGetReturn.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    startdate: "2013-06-27",
    enddate: "2020-08-25",
    gold: 10000,
    silver: 10000,
    palladium: 10000,
    platinum: 10000,
    startvalue: 40000,
    endValues: {
      gesamt: null,
      gold: null,
      silver: null,
      platinum: null,
      palladium: null,
    },
    renditeValues: {
      gesamt: null,
      gold: null,
      silver: null,
      platinum: null,
      palladium: null,
    },
  };

  componentDidMount() {
    this.callAPIandGetReturn();
  }

  handleChange(variableName, value) {
    //if (!value) value = 0;
    this.setState((old) => {
      old[variableName] = value;
      old.startvalue =
        old["gold"] + old["silver"] + old["palladium"] + old["platinum"];
      console.log(old);
      //this.callAPIandGetReturn();
      return old;
    });
  }

  async callAPIandGetReturn() {
    let { data } = await axios.post(apiEndPointURL, this.state);

    this.setState((old) => {
      console.log(data.gesamt);
      old.endValues = {
        gesamt: data.gesamt,
        gold: data.gold,
        silver: data.silver,
        palladium: data.palladium,
        platinum: data.platinum,
      };

      old.renditeValues = {
        gesamt: rendite(old.startvalue, old.endValues.gesamt),
        gold: rendite(old.gold, old.endValues.gold),
        silver: rendite(old.silver, old.endValues.silver),
        palladium: rendite(old.palladium, old.endValues.palladium),
        platinum: rendite(old.platinum, old.endValues.platinum),
      };

      return old;
    });
    return;
  }

  render() {
    console.log(this.state);
    const {
      silver,
      gold,
      palladium,
      platinum,
      startvalue,
      endValues,
      renditeValues,
      startdate,
      enddate,
    } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-md-6 col-sm-12" style={{ marginBottom: "1em" }}>
            <DateInput
              title="Startdatum"
              onChange={(e) => this.handleChange("startdate", e.target.value)}
              value={this.state.startdate}
            ></DateInput>
          </div>
          <div className="col-md-6 col-sm-12" style={{ marginBottom: "1em" }}>
            <DateInput
              title="Enddatum"
              onChange={(e) => this.handleChange("enddate", e.target.value)}
              value={this.state.enddate}
            ></DateInput>
          </div>
        </div>
        <div className="row">
          <div
            className="col-md-3 col-sm-6 col-xs-12"
            style={{ marginBottom: "1em" }}
          >
            <NumberInput
              title="Gold"
              onChange={(e) =>
                this.handleChange("gold", parseInt(e.target.value))
              }
              value={this.state.gold}
            ></NumberInput>
          </div>
          <div className="col-md-3 col-sm-6" style={{ marginBottom: "1em" }}>
            <NumberInput
              title="Silber"
              onChange={(e) =>
                this.handleChange("silver", parseInt(e.target.value))
              }
              value={this.state.silver}
            ></NumberInput>
          </div>
          <div className="col-md-3 col-sm-6" style={{ marginBottom: "1em" }}>
            <NumberInput
              title="Platin"
              onChange={(e) =>
                this.handleChange("platinum", parseInt(e.target.value))
              }
              value={this.state.platinum}
            ></NumberInput>
          </div>
          <div className="col-md-3 col-sm-6">
            <NumberInput
              title="Palladium"
              onChange={(e) =>
                this.handleChange("palladium", parseInt(e.target.value))
              }
              value={this.state.palladium}
            ></NumberInput>
          </div>
        </div>
        <hr></hr>

        <Button
          onClick={this.callAPIandGetReturn}
          style={{
            marginBottom: "1em",
          }}
          variant="primary"
        >
          Rendite Berechnen
        </Button>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Gesamt</th>
                <th scope="col">Gold</th>
                <th scope="col">Silber</th>
                <th scope="col">Platin</th>
                <th scope="col">Palladium</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Investment</th>
                <th scope="row">{formatMoney(startvalue)}</th>
                <td>{formatMoney(gold)}</td>
                <td>{formatMoney(silver)}</td>
                <td>{formatMoney(platinum)}</td>
                <td>{formatMoney(palladium)}</td>
              </tr>
              <tr>
                <th scope="row">Endbetrag</th>
                <th scope="row">{formatMoney(endValues.gesamt)}</th>
                <td>{formatMoney(endValues.gold)}</td>
                <td>{formatMoney(endValues.silver)}</td>
                <td>{formatMoney(endValues.platinum)}</td>
                <td>{formatMoney(endValues.palladium)}</td>
              </tr>
              <tr>
                <th scope="row">Return</th>
                <th scope="row">{renditeString(renditeValues.gesamt)}</th>
                <td>{renditeString(renditeValues.gold)}</td>
                <td>{renditeString(renditeValues.silver)}</td>
                <td>{renditeString(renditeValues.platinum)}</td>
                <td>{renditeString(renditeValues.palladium)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr></hr>
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <h4>Portfolio am {new Date(startdate).toLocaleDateString()}</h4>
            <PieChart
              gold={gold}
              silver={silver}
              platinum={platinum}
              palladium={palladium}
              gesamt={startvalue}
            ></PieChart>
          </div>
          <div className="col-md-6 col-sm-12">
            <h4>Portfolio am {new Date(enddate).toLocaleDateString()}</h4>
            {endValues.gesamt ? (
              <PieChart
                gold={endValues.gold}
                silver={endValues.silver}
                platinum={endValues.platinum}
                palladium={endValues.palladium}
                gesamt={endValues.gesamt}
              ></PieChart>
            ) : (
              "???"
            )}
          </div>
        </div>
      </div>
    );
  }
}
