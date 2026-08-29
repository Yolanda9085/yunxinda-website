'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 验证
    if (!formData.name.trim()) {
      setError('请填写姓名');
      return;
    }
    if (!formData.phone.trim()) {
      setError('请填写电话');
      return;
    }
    if (!/^1\d{10}$/.test(formData.phone.trim()) && formData.phone.trim().length < 7) {
      setError('请填写有效的电话号码');
      return;
    }
    if (!formData.message.trim()) {
      setError('请填写留言内容');
      return;
    }
    if (formData.message.trim().length > 2000) {
      setError('留言内容过长');
      return;
    }

    // 本地存储提交记录（演示）
    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    submissions.push({
      ...formData,
      submittedAt: new Date().toISOString(),
    });
    localStorage.setItem('submissions', JSON.stringify(submissions));

    // 重置表单
    setFormData({ name: '', phone: '', message: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <main style={{ fontFamily: '"PingFang SC", "Microsoft YaHei", system-ui, -apple-system, sans-serif' }}>
      {/* Hero Section */}
      <section style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #f6f9fc 0%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: '0 0 auto 0',
          height: '58vh',
          pointerEvents: 'none',
          zIndex: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 15% 20%, rgba(245,233,212,0.65), transparent 55%),
            radial-gradient(ellipse 70% 55% at 85% 15%, rgba(249,107,238,0.2), transparent 50%),
            radial-gradient(ellipse 90% 70% at 50% 0%, rgba(136,204,255,0.45), transparent 60%),
            radial-gradient(ellipse 60% 50% at 70% 35%, rgba(119,85,255,0.28), transparent 55%)
          `
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
          <h1 style={{
            fontSize: 'clamp(2.125rem, 4.6vw, 3.375rem)',
            fontWeight: 500,
            color: '#0d253d',
            margin: '0 0 1rem 0',
            letterSpacing: '-0.04em'
          }}>
            云心达
          </h1>
          <p style={{
            fontSize: '1.1875rem',
            color: '#3d5166',
            margin: '0 0 2rem 0',
            lineHeight: 1.55
          }}>
            把临床科研能力转化为可运营的健康管理服务
          </p>
          <p style={{
            fontSize: '1rem',
            color: '#4a5568',
            maxWidth: '600px',
            margin: '0 auto 2.5rem auto',
            lineHeight: 1.55
          }}>
            云心达整合健康数据整理、连续健康管理与机构运营赋能，为医疗机构提供可持续运营的健康管理服务支持。
          </p>
          <button style={{
            padding: '0.875rem 2rem',
            backgroundColor: '#7755ff',
            color: 'white',
            border: 'none',
            borderRadius: '999px',
            fontSize: '1rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(119,85,255,0.3)'
          }}
          onMouseOver={e => {
            const target = e.target as HTMLButtonElement;
            target.style.backgroundColor = '#6344e0';
            target.style.boxShadow = '0 6px 16px rgba(119,85,255,0.4)';
          }}
          onMouseOut={e => {
            const target = e.target as HTMLButtonElement;
            target.style.backgroundColor = '#7755ff';
            target.style.boxShadow = '0 4px 12px rgba(119,85,255,0.3)';
          }}
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            联系我们
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '5.5rem 1.5rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4.2vw, 3rem)',
          fontWeight: 500,
          color: '#0d253d',
          textAlign: 'center',
          marginBottom: '3rem',
          letterSpacing: '-0.035em'
        }}>
          我们的服务
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {[
            { title: '健康数据整理', desc: '专业健康数据采集与结构化管理' },
            { title: '连续健康管理', desc: '长期个人健康档案跟踪与服务' },
            { title: '日常监测', desc: '持续跟踪健康指标与趋势' },
            { title: '机构运营赋能', desc: '为医疗机构提供运营支持方案' }
          ].map((item, i) => (
            <div key={i} style={{
              padding: '1.5rem',
              border: '1px solid #e3e8ee',
              borderRadius: '16px',
              background: 'white',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={e => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = 'translateY(-4px)';
              el.style.boxShadow = '0 12px 24px rgba(119,85,255,0.1)';
            }}
            onMouseOut={e => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = 'none';
            }}
            >
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, color: '#0d253d', margin: '0 0 0.5rem 0' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#4a5568', margin: 0, lineHeight: 1.55 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        padding: '5.5rem 1.5rem',
        background: '#f6f9fc'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4.2vw, 3rem)',
            fontWeight: 500,
            color: '#0d253d',
            textAlign: 'center',
            marginBottom: '2rem',
            letterSpacing: '-0.035em'
          }}>
            联系我们
          </h2>

          {submitted && (
            <div style={{
              padding: '1rem',
              background: '#d4edda',
              border: '1px solid #c3e6cb',
              borderRadius: '8px',
              color: '#155724',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              提交成功！我们会尽快与您联系。
            </div>
          )}

          {error && (
            <div style={{
              padding: '1rem',
              background: '#f8d7da',
              border: '1px solid #f5c6cb',
              borderRadius: '8px',
              color: '#721c24',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#0d253d', fontWeight: 500 }}>
                姓名 <span style={{ color: '#e74c3c' }}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="请输入您的姓名"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #e3e8ee',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#7755ff';
                  e.target.style.boxShadow = '0 0 0 3px rgba(119,85,255,0.1)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = '#e3e8ee';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#0d253d', fontWeight: 500 }}>
                电话 <span style={{ color: '#e74c3c' }}>*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="请输入您的电话号码"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #e3e8ee',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#7755ff';
                  e.target.style.boxShadow = '0 0 0 3px rgba(119,85,255,0.1)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = '#e3e8ee';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#0d253d', fontWeight: 500 }}>
                留言 <span style={{ color: '#e74c3c' }}>*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="请输入您的留言内容"
                rows={5}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #e3e8ee',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                  resize: 'vertical'
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#7755ff';
                  e.target.style.boxShadow = '0 0 0 3px rgba(119,85,255,0.1)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = '#e3e8ee';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: '0.875rem 2rem',
                backgroundColor: '#7755ff',
                color: 'white',
                border: 'none',
                borderRadius: '999px',
                fontSize: '1rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(119,85,255,0.3)'
              }}
              onMouseOver={e => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundColor = '#6344e0';
                target.style.boxShadow = '0 6px 16px rgba(119,85,255,0.4)';
              }}
              onMouseOut={e => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundColor = '#7755ff';
                target.style.boxShadow = '0 4px 12px rgba(119,85,255,0.3)';
              }}
            >
              提交
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '2rem 1.5rem',
        textAlign: 'center',
        color: '#4a5568',
        borderTop: '1px solid #e3e8ee',
        fontSize: '0.875rem'
      }}>
        <p>© 2026 云心达。保留所有权利。</p>
      </footer>
    </main>
  );
}
