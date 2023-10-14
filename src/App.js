import './App.css';
import React, { useState, useEffect } from 'react';
import dateFormat from 'dateformat';
function App() {
  const[data,setData]=useState(null);
  useEffect(()=>{
    const fetchdata=async()=>
    {
      try
      {
        const url='https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json';
        var response=await fetch(url);
        response=await response.json();
        setData(response);
      }
      catch(e)
      {
        console.log("errror fetching data ",e);
      }
    };
    fetchdata();
  },[]);
  function Cards(data){
    const date=data.item.date
    const newdate=dateFormat(date, "mmmm dS yyyy")
    var res=data.item._embedded['wp:term'];
    while(res.length>0 && res[res.length-1].length===0)
    {
      res.pop();
    }
    let title=res[res.length-1]['0'].name;
    title=title.toUpperCase();
    return(

  <div className="row" >
        <div className="p-card shadow">
            <div className="p-card__content final">
              <div>
                  <p > {title}</p>
                  <hr className="u-sv1"/>
                  <img className="p-card__image" alt="" height="185" width="330" src={data.item.featured_media}/>
                  <h4>
                      <a href={data.item.link}>{data.item.title.rendered}</a>
                  </h4>
              </div>
                <div>
                  <p className="u-no-padding--bottom style" >By <a href={data.item._embedded.author[0].link}>{data.item._embedded.author[0].name}</a> on {newdate}</p>
                  <hr className="u-no-margin--bottom"/>
                  <p className="blog-p-card__footer">Article</p>
                </div>
            </div>
        
        </div>
</div>
    );
  }

  return (
    <div className="page">
      {data ? data.map((item)=>{
        return <Cards item={item} />
     }) : <>not fetched yet</>}
    </div>
  )
}

export default App;
