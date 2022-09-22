import React from "react";
import "./Matrix.css";
import { useSelector } from "react-redux";
import { incrementCellFC, setAverage } from "../../slices/matrixSlice";

const DrawMatrix = ({ matrix, findAverage, dispatch, findSimilarCell, showPercent, countPercent}) => {
  return (
    <div>
      {
        matrix.length !== 0 &&
        <div>
          <table>
            <thead>
            <tr>
              <th>№</th>
              {matrix.map((item, index) => {
                index++;
                return <th key={index}>{index}</th>;

              })}
              <th>Sum</th>
            </tr>
            </thead>
            <tbody>
            {matrix.map((item, index) => {
              index++;
              return (
                <tr key={index}>
                  <td>{index}</td>
                  {
                    item.map((i) => {
                      let percent = countPercent(item, i)
                      return <td
                        onMouseOver={(e) => {findSimilarCell(i, e);}}
                        onMouseLeave={(e) => findSimilarCell(i, e)}
                        onClick={() => dispatch(incrementCellFC(i))}
                        key={i.id}
                        className={"table table_td " + (i.isActive ? "active" : "")
                          + (i.isShowPercent ? " table_td--percent" : '')}>
                        {i.isShowPercent ? percent : i.amount}
                        {i.isShowPercent && <div className="percent__height" style={{height: percent, background: "#6500FFFF"}}></div>}
                      </td>;
                    })
                  }
                  <td className="table table_sum"
                    onMouseOver={(e) => showPercent(index, e)}
                    onMouseLeave={(e) => showPercent(index, e)}
                  >
                    {
                      item.reduce((prev, current) => {
                        return prev + current.amount;
                      }, 0)
                    }
                  </td>
                </tr>
              );
            })}
            </tbody>

            <tfoot>
            <tr>
              <th>Avg</th>
              {
                matrix[0].map((item, index) => {
                  return <th className="table table_sum"
                             key={index}>{findAverage(index)}</th>;
                })
              }

              {
                <th className="table table_sum">
                  {
                    matrix[0].reduce((item, curr, index) => {
                      return item + findAverage(index);
                    }, 0)
                  }
                </th>
              }

            </tr>
            </tfoot>
          </table>
        </div>
      }
    </div>
  );
};

export default DrawMatrix;
