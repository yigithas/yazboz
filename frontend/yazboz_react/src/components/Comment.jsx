import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchCommentsByArticle, addComment } from '../redux/commentSlice';
import '../css/Comment.css';

function Comment({ articleId: propArticleId }) {
  const { id: paramArticleId } = useParams();
  const articleId = propArticleId || paramArticleId;

  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  // Redux state selector
  const { comments, loading, error, addLoading, addError } = useSelector(
    (store) => store.comments
  );
  const { token } = useSelector((store) => store.auth);

  // Kullanıcı giriş yapmış mı kontrolü
  const isAuthenticated = Boolean(token || localStorage.getItem('token'));

  useEffect(() => {
    if (articleId) {
      dispatch(fetchCommentsByArticle(articleId));
    }
  }, [dispatch, articleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    if (!content.trim()) return;

    const resultAction = await dispatch(
      addComment({ articleId, content: content.trim() })
    );

    if (addComment.fulfilled.match(resultAction)) {
      setContent('');
    }
  };

  // Tarih formatlama yardımcısı
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="comment-section-container">
      <h3 className="comment-section-title">
        Yorumlar
        <span className="comment-count-badge">{comments.length}</span>
      </h3>

      {/* Yorum Ekleme Formu */}
      <div className={`comment-form-wrapper ${!isAuthenticated ? 'disabled-wrapper' : ''}`}>
        {!isAuthenticated && (
          <div className="comment-login-warning">
            <span>🔒 Yorum yapmak için giriş yapmalısınız.</span>
            <Link to="/login" className="comment-login-link">
              Giriş Yap
            </Link>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <textarea
            className="comment-textarea"
            placeholder={
              isAuthenticated
                ? 'Düşüncelerinizi paylaşın...'
                : 'Yorum yapabilmek için lütfen giriş yapınız...'
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={!isAuthenticated || addLoading}
            rows={3}
          />

          {addError && (
            <div className="comment-error-alert">
              ⚠️ {typeof addError === 'string' ? addError : 'Yorum gönderilirken bir hata oluştu.'}
            </div>
          )}

          <div className="comment-form-actions">
            <button
              type="submit"
              className="comment-submit-btn"
              disabled={!isAuthenticated || addLoading || !content.trim()}
            >
              {!isAuthenticated
                ? 'Giriş Yapmalısınız'
                : addLoading
                ? 'Gönderiliyor...'
                : 'Yorum Yap'}
            </button>
          </div>
        </form>
      </div>

      {/* Yorum Listesi */}
      {loading ? (
        <div className="comment-loading">Yorumlar yükleniyor...</div>
      ) : error ? (
        <div className="comment-error-alert">Hata: {error}</div>
      ) : comments.length === 0 ? (
        <div className="comment-empty">
          Henüz yorum yapılmamış. İlk yorumu sen yap!
        </div>
      ) : (
        <div className="comment-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <div className="comment-author-info">
                  <div className="comment-avatar">
                    {(comment.writerNickName || 'A').charAt(0)}
                  </div>
                  <span className="comment-author-name">
                    {comment.writerNickName || 'Anonim'}
                  </span>
                </div>
                <span className="comment-date">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              <p className="comment-body">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
