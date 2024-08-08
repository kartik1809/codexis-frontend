import React from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Cards = (props) => {
  return (
    <div className="card flex flex-col gap-2 bg-slate-600 rounded-lg p-2">
      <div className="card_title flex justify-between">
        <h4 className="text-lg font-semibold">{props.title}</h4>
        <AccessTimeIcon/>
      </div>
      <div className="card_labels flex gap-2">
        {props.labels.map((label, index) => {
          return <span key={index} className="label bg-slate-500 rounded-lg p-1">{label}</span>
        })}
      </div>
      <div className="card_date flex justify-between">
        <p>{props.date}</p>
        <p className="status">{props.status}</p>
      </div>
    </div>
  )
}

export default Cards
