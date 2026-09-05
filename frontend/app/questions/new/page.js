'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';

export default function NewQuestion(){
  const router=useRouter(); const [saving,setSaving]=useState(false);
  async function submit(e){
    e.preventDefault(); setSaving(true); const f=new FormData(e.currentTarget);
    const payload=Object.fromEntries(f.entries());
    const r=await fetch('http://localhost:8000/questions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    if(r.ok){router.push('/');router.refresh()} else {alert('保存失败')}; setSaving(false);
  }
  return <><div className="nav"><h1>新增错题</h1><Link href="/">返回首页</Link></div><form className="card" onSubmit={submit}>
    <div className="field"><label>题目 *</label><textarea name="question_text" required placeholder="例如：3.6 × 2.5 = ?"/></div>
    <div className="grid"><div className="field"><label>科目</label><select name="subject" defaultValue="数学"><option>数学</option><option>语文</option><option>英语</option></select></div><div className="field"><label>年级</label><input name="grade" placeholder="五年级"/></div></div>
    <div className="grid"><div className="field"><label>章节</label><input name="chapter"/></div><div className="field"><label>知识点</label><input name="knowledge_point"/></div></div>
    <div className="field"><label>我的错误答案</label><textarea name="wrong_answer"/></div><div className="field"><label>正确答案</label><textarea name="correct_answer"/></div>
    <div className="field"><label>错误原因</label><select name="error_type"><option value="">请选择</option><option value="concept">概念不清</option><option value="calculation">计算错误</option><option value="reading">审题错误</option><option value="method">方法不会</option><option value="careless">粗心</option><option value="memory">知识遗忘</option></select></div>
    <div className="field"><label>解析 / 解题思路</label><textarea name="explanation"/></div><button className="button" disabled={saving}>{saving?'保存中...':'保存错题'}</button>
  </form></>
}
