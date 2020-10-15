import React from 'react';
import RatingIcon from '@material-ui/lab/Rating';

const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

const Bar = ({c,p,k})=>{
  return(
    <>
      <div className="side">
        <div>{k} star</div>
      </div>
      <div className="middle">
        <div className="bar-container">
          <div className={`bar-${k}`} style={{width:`${p}%`}}>
          </div>
        </div>
      </div>
      <div className="side right">
        <div>
          {c}
        </div>
      </div>
    </>
  );
};

const SummaryBars = ({vals}) => {
  let r_counts = [0,0,0,0,0];
  let r_p = [0,0,0,0,0];
  let p_cal = 100/vals.length;
  let content = [];
  for(let i=0;i<vals.length;i++){
    r_counts[vals[i]-1]++;
  }
  for(let i=0;i<5;i++){
    r_p[i] = r_counts[i] * p_cal;
  }
  for(let i=4;i>=0;i--){
    content.push(<Bar c={r_counts[i]} p={r_p[i]} key={i+1} k={i+1}/>)
  }
  return(
    <div className="row">
      {content}
    </div>
  );
}

export default function RatingSummary({ratings}) {
  const r_types = [];
  const r_vals = [];
  ratings.map(rating =>{
    if(r_types.includes(rating.rating_name)){
      r_vals[r_types.indexOf(rating.rating_name)].vals.push(rating.rating_value)
    }
    else {
      r_types.push(rating.rating_name);
      r_vals.push({
        r_index: r_types.indexOf(rating.rating_name),
        vals: [rating.rating_value]
      })
    }
  });
  const summaryComponent = r_vals.map((r_val, index)=>{
    let nums = r_val.vals;
    let avg = average(nums);
    return(
      <div className="card m-1 ml-3" key={r_val.r_index} style={{width:'20rem'}}>
        <h5 className="card-header">{r_types[index]}</h5>
        <div className="card-body">
          <RatingIcon readOnly name="size-medium" defaultValue={avg} size="medium" />
          <p>{avg} average based on {nums.length} ratings</p>
          <SummaryBars vals={nums}/>
        </div>
      </div>
    );
  });
  return (
    <div>
      <h5>Rating Summary</h5>
      <div className="row">
        {summaryComponent}
      </div>
    </div>
  );
}