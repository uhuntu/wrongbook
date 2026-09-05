'use client';
import {useEffect,useState} from 'react';
import {useParams} from 'next/navigation';
import Link from 'next/link';

export default function Detail(){
 const {id}=useParams(); const [q,setQ]=useState(null);
 async function load(){const r=await fetch(`http://localhost:8000/questions/${id}`); setQ(await r.json())}
 useEffect(()=>{load()},[id]);
 async function review(result){await fetch(`http://localhost:8000/questions/${id}/reviews`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({result})});load()}
 if(!q)return <p>加载中...</p>;
 return <><div className="nav"><h1>错题详情</h1><Link href="/">返回首页</Link></div>
 <div className="card"><h2>{q.question_text}</h2><p><span className="tag">{q.subject}</span><span className="tag">{q.knowledge_point||'未设置知识点'}</span><span className="tag">{q.status}</span></p>
 <h3>我的错误答案</h3><p>{q.wrong_answer||'—'}</p><h3>正确答案</h3><p>{q.correct_answer||'—'}</p><h3>解析</h3><p>{q.explanation||'—'}</p></div>
 <div className="card"><h2>这次复习结果</h2><div className="reviewButtons"><button onClick={()=>review('dont_know')}>完全不会</button><button onClick={()=>review('wrong')}>又做错了</button><button onClick={()=>review('right_unsure')}>做对但不熟</button><button onClick={()=>review('mastered')}>已经掌握</button></div></div>
 <div className="card"><h2>复习记录</h2>{q.reviews.length===0?<p className="muted">还没有复习记录。</p>:q.reviews.slice().reverse().map(r=><p key={r.id}>{new Date(r.reviewed_at).toLocaleString()} — {r.result}</p>)}</div></>
}
