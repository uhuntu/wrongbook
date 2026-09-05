import Link from 'next/link';

async function getQuestions(){
  try{
    const r=await fetch('http://backend:8000/questions',{cache:'no-store'});
    return await r.json();
  }catch{return []}
}

export default async function Home(){
  const qs=await getQuestions();
  const mastered=qs.filter(q=>q.status==='mastered').length;
  const reviewing=qs.length-mastered;
  return <>
    <div className="nav"><div><h1>📘 我的错题本</h1><div className="muted">先把错题收集起来，再真正学会它。</div></div><Link href="/questions/new">+ 新增错题</Link></div>
    <div className="grid">
      <div className="card"><div className="muted">全部错题</div><div className="metric">{qs.length}</div></div>
      <div className="card"><div className="muted">待复习</div><div className="metric">{reviewing}</div></div>
      <div className="card"><div className="muted">已掌握</div><div className="metric">{mastered}</div></div>
    </div>
    <div className="card"><h2>最近错题</h2>{qs.length===0?<p className="muted">还没有错题，先录入第一道吧。</p>:qs.slice(0,8).map(q=><p key={q.id}><Link className="link" href={`/questions/${q.id}`}>{q.question_text}</Link> <span className="tag">{q.subject}</span><span className="tag">{q.status}</span></p>)}</div>
  </>
}
