import styled from "styled-components";
import React, { useState } from "react";

// Styled components for the UI
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: Montserrat;
  padding: 10px 55px 10px 22px;
  font-size: 18px;
  gap: 10px;
  width: 100%;
  font-weight: bold;

  & input {
    padding: 10px 12px;
    border-radius: 12px;
    background: #e6e8e9;
    outline: none;
    width: 100%;
  }
`;

const Cell = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  font-size: 14px;
  width: 100%;
  border-radius: 2px;
  align-items: center;
  font-weight: normal;
  justify-content: space-between;
  border: 1px solid #e6e8e9;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
`;

const RemoveButton = styled.button`
  background-color: ${(props) => (props.isExpense ? "#ff4d4f" : "#4caf50")};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.isExpense ? "#e63946" : "#388e3c")};
  }
`;

// Transaction Cell Component with Remove Button
const TransactionCell = ({ payload, removeTransaction }) => {
  return (
    <Cell isExpense={payload?.type === "EXPENSE"}>
      <span>{payload.desc}</span>
      <span>₹{payload.amount}</span>
      <RemoveButton 
      isExpense={payload?.type === "EXPENSE"}
      onClick={() => removeTransaction(payload.id)}>
        Remove
      </RemoveButton>
    </Cell>
  );
};

// Main Transaction Component
const TransactionComponent = ({ transactions, removeTransaction }) => {
  const [searchText, setSearchText] = useState("");

  const filteredTransactions = transactions?.filter((transaction) =>
    transaction.desc.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Container>
      <div>Transaction</div>
      <input
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {filteredTransactions?.length > 0 ? (
        filteredTransactions.map((transaction) => (
          <TransactionCell
            key={transaction.id}
            payload={transaction}
            removeTransaction={removeTransaction}
          />
        ))
      ) : (
        <span>No transactions found.</span>
      )}
    </Container>
  );
};

export default TransactionComponent;