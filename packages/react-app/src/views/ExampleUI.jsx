/* eslint-disable jsx-a11y/accessible-emoji */

import React, { useState } from "react";
import { Button, List, Divider, Input, Card, DatePicker, Slider, Switch, Progress, Spin } from "antd";
import { SyncOutlined } from '@ant-design/icons';
import { Address, Balance, TokenBalance } from "../components";
import { parseEther, formatEther } from "@ethersproject/units";
//victory imports below
import { render } from "react-dom"
import { VictoryChart, VictoryTheme, VictoryLine, VictoryAxis, VictoryPie, VictoryVoronoiContainer } from "victory"
import "./ExampleUI.css"
import { Token } from "@uniswap/sdk";

export default function ExampleUI({purpose, setPurposeEvents, address, mainnetProvider, userProvider, localProvider, yourLocalBalance, price, tx, readContracts, writeContracts }) {


  const [newPurpose, setNewPurpose] = useState("loading...");

  const victorydata = [
    {day: 1, price: 100},
    {day: 2, price: 105},
    {day: 3, price: 115},
    {day: 4, price: 113},
    {day: 5, price: 120},
]

  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div className="container1">
        <h1>Moat Index</h1>

        <h4>purpose: {purpose}</h4>

        <Divider/>

{/* Line Chart displayed below */}
      <div className="flexWrap">
        <div className="VictoryLine">
          <h2 className="chartTitle"> Moat Index Price </h2>
            <VictoryChart 
            domainPadding={20}
            containerComponent={
              <VictoryVoronoiContainer 
                labels={({ datum }) => `Price: ${datum.price}, Date: ${datum.day}`}
               /> 
            }>
            <VictoryAxis
              style={{
                axis: {
                  stroke: '#cccccc' //change color of x axis
                },
                tickLabels: {
                  fill: '#cccccc' //change color of x axis labels
                }
              }}
            />
            <VictoryAxis
              dependentAxis
              style={{
                axis: {
                  stroke: '#cccccc' //change color of x axis
                },
                tickLabels: {
                  fill: '#cccccc' //change color of x axis labels
                }
              }}
            />
                <VictoryLine
                    style={{
                        data: { stroke: "#66A828" },
                        parent: { border: "1px solid #cccccc" },
                        labels: {fontSize: 12}
                    }}
                    data={victorydata}
                    // data accessor for data values:
                    x="day"
                    y="price"
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    height={100}
                    width={180}
                />
            </VictoryChart>
            </div>

        <div className="purposeButton">
          <h2 className="currentPrice">Current Index Price:</h2>

          <Input onChange={(e)=>{setNewPurpose(e.target.value)}} />
          <Button onClick={()=>{
            console.log("newPurpose",newPurpose)
            /* look how you call setPurpose on your contract: */
            tx( writeContracts.YourContract.setPurpose(newPurpose) )
          }}>Set Purpose</Button>
        </div>
      </div>

        <Divider />

        Your Address:
        <Address
            address={address}
            ensProvider={mainnetProvider}
            fontSize={16}
        />

        <Divider />

        {  /* use formatEther to display a BigNumber: */ }
        <h2>Your Eth Balance: {yourLocalBalance?formatEther(yourLocalBalance):"..."}</h2>

        <div>OR</div>

        <Balance
          address={address}
          provider={localProvider}
          price={price}
        />

        <Divider/>

        <div>🐳  Example Whale Balance:</div>

        <Balance
          balance={parseEther("1000")}
          provider={localProvider}
          price={price}
        />

        <Divider/>

        Your Contract Address:
        <Address
            address={readContracts?readContracts.YourContract.address:readContracts}
            ensProvider={mainnetProvider}
            fontSize={16}
        />

        <Divider />

        <div style={{margin:8}}>
          <Button onClick={()=>{
            /* look how you call setPurpose on your contract: */
            tx( writeContracts.YourContract.setPurpose("🍻 Cheers") )
          }}>Set Purpose to "🍻 Cheers"</Button>
        </div>

        <div style={{margin:8}}>
          <Button onClick={()=>{
            /*
              you can also just craft a transaction and send it to the tx() transactor
              here we are sending value straight to the contract's address:
            */
            tx({
              to: writeContracts.YourContract.address,
              value: parseEther("0.001")
            });
            /* this should throw an error about "no fallback nor receive function" until you add it */
          }}>Send Value</Button>
        </div>

        <div style={{margin:8}}>
          <Button onClick={()=>{
            /* look how we call setPurpose AND send some value along */
            tx( writeContracts.YourContract.setPurpose("💵 Paying for this one!",{
              value: parseEther("0.001")
            }))
            /* this will fail until you make the setPurpose function payable */
          }}>Set Purpose With Value</Button>
        </div>


        <div style={{margin:8}}>
          <Button onClick={()=>{
            /* you can also just craft a transaction and send it to the tx() transactor */
            tx({
              to: writeContracts.YourContract.address,
              value: parseEther("0.001"),
              data: writeContracts.YourContract.interface.encodeFunctionData("setPurpose(string)",["🤓 Whoa so 1337!"])
            });
            /* this should throw an error about "no fallback nor receive function" until you add it */
          }}>Another Example</Button>
        </div>

      </div>

    </div>
  );
}
