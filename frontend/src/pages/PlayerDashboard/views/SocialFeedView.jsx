import React, { useState, useEffect } from 'react';
import { MessageSquare, Heart, Send, Plus, Check, Globe, FileText, Image, Video, Camera, Calendar, Smile, X, Trash2, MoreHorizontal, Pencil, Pin, Sparkles, List, MessageCircle, BarChart2, AlertCircle, TrendingUp, UserPlus, UserCheck, VolumeX, Volume2, Ban, Flag } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export const SocialFeedView = () => {
  const { user } = useAuth();

  // Load avatar and user details
  const avatar = localStorage.getItem('user_avatar') || '🎮';
  const storedUser = (() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : user;
    } catch {
      return user;
    }
  })();
  const ign = storedUser?.username || 'AnandYT';

  // Load posts
  const defaultPosts = [
    {
      id: 'post_1',
      username: 'AnandYT',
      avatar: '🎮',
      time: '15 mins ago',
      content: "CHAMPIONS OF STAGECORE SEASON 4! 🏆 Grand Finals victory against Sentinels Pro. Dropped 28 kills on Mirage with the clutch 1v3 retake on B site! Huge GG to the squad! #ValoClutch #StageCore2026 #EsportsChampion",
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop',
      likes: 89,
      comments: [
        { username: 'SlayerX', text: "That 1v3 clutch was absolute cinema! 🔥" },
        { username: 'Coach_Red', text: "Incredible utility coordination and aim discipline. Proud of you captain!" },
        { username: 'Mortal_Pro', text: "Deserved win Anand! See you in masters!" }
      ],
      isLiked: true,
      isPinned: true
    },
    {
      id: 'post_2',
      username: 'SlayerX',
      avatar: '⚡',
      time: '1 hour ago',
      content: "New 240Hz OLED pro battlestation setup is finally ready! Calibrated for tonight's BGMI Masters scrims. What do you think of the RGB theme? 🎯⚡",
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1000&auto=format&fit=crop',
      likes: 54,
      comments: [
        { username: 'AnandYT', text: "Insane setup bro! Ready to dominate the lobby tonight." }
      ],
      isLiked: false
    },
    {
      id: 'post_3',
      username: 'JONATHAN',
      avatar: '🔥',
      time: '3 hours ago',
      content: 'Live from the StageCore Arena Stage! The crowd energy in Mumbai is unreal today! Unbelievable tournament atmosphere 💥',
      image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=1000&auto=format&fit=crop',
      likes: 142,
      comments: [
        { username: 'AnandYT', text: 'Crowd goes wild for Jonathan! 👑' }
      ],
      isLiked: true
    },
    {
      id: 'post_4',
      username: 'AnandYT',
      avatar: '🎮',
      time: 'Yesterday at 07:30 PM',
      content: 'Team Alpha bootcamp session before the CS2 Invitational. Map veto strategy discussed and ready for execution. Let\'s go! 🎯⚔️',
      image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=1000&auto=format&fit=crop',
      likes: 41,
      comments: [
        { username: 'Xeno_Rider', text: 'Locking in the double sniper setup!' }
      ],
      isLiked: false
    },
    {
      id: 'post_5',
      username: 'StageCore_Official',
      avatar: '👑',
      time: '2 days ago',
      content: 'ANNUAL SHOWDOWN 2026: StageCore Championship Prizepool officially increased to ₹500,000 INR! Register your squad before spots run out! 🚀🔥',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop',
      likes: 230,
      comments: [
        { username: 'AnandYT', text: 'Team Alpha is already registered and locked in!' }
      ],
      isLiked: true
    }
  ];

  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem('stagecore_posts_feed');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    localStorage.setItem('stagecore_posts_feed', JSON.stringify(defaultPosts));
    return defaultPosts;
  });

  // Post type state (useful for file picker limits)
  const [postType, setPostType] = useState('text'); // 'text' | 'image' | 'video'

  // Post creation inputs
  const [newPostText, setNewPostText] = useState('');
  const [uploadedMediaUrl, setUploadedMediaUrl] = useState(''); // holds Base64 string for file uploads
  
  // Custom states for richer post composition
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [showImagePresets, setShowImagePresets] = useState(false);
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [showSchedulePicker, setShowSchedulePicker] = useState(false);
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [scheduledDate, setScheduledDate] = useState('');
  const [gifUrl, setGifUrl] = useState('');

  // Comments and toast
  const [commentInputs, setCommentInputs] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  const [activeMenuPostId, setActiveMenuPostId] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [activityPost, setActivityPost] = useState(null);
  const [analyticsPost, setAnalyticsPost] = useState(null);
  const [replyPermissionPost, setReplyPermissionPost] = useState(null);
  const [communityNotePost, setCommunityNotePost] = useState(null);
  const [noteRequestReason, setNoteRequestReason] = useState('');

  const [following, setFollowing] = useState(() => {
    try {
      const saved = localStorage.getItem('stagecore_following');
      return saved ? JSON.parse(saved) : ['SlayerX', 'JONATHAN'];
    } catch {
      return ['SlayerX', 'JONATHAN'];
    }
  });

  const [mutedUsers, setMutedUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('stagecore_muted_users');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [blockedUsers, setBlockedUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('stagecore_blocked_users');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [reportingPost, setReportingPost] = useState(null);
  const [reportReason, setReportReason] = useState('spam');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleFollow = (username) => {
    const isFollowing = following.includes(username);
    let updatedFollowing;
    if (isFollowing) {
      updatedFollowing = following.filter(f => f !== username);
      triggerToast(`You unfollowed @${username}`);
    } else {
      updatedFollowing = [...following, username];
      triggerToast(`You are now following @${username}`);
    }
    setFollowing(updatedFollowing);
    localStorage.setItem('stagecore_following', JSON.stringify(updatedFollowing));
    window.dispatchEvent(new Event('storage'));
  };

  const handleToggleMute = (username) => {
    const isMuted = mutedUsers.includes(username);
    let updatedMuted;
    if (isMuted) {
      updatedMuted = mutedUsers.filter(u => u !== username);
      triggerToast(`You unmuted @${username}`);
    } else {
      updatedMuted = [...mutedUsers, username];
      triggerToast(`You muted @${username}. Their posts are now hidden.`);
    }
    setMutedUsers(updatedMuted);
    localStorage.setItem('stagecore_muted_users', JSON.stringify(updatedMuted));
    window.dispatchEvent(new Event('storage'));
  };

  const handleToggleBlock = (username) => {
    const isBlocked = blockedUsers.includes(username);
    let updatedBlocked;
    if (isBlocked) {
      updatedBlocked = blockedUsers.filter(u => u !== username);
      triggerToast(`You unblocked @${username}`);
    } else {
      updatedBlocked = [...blockedUsers, username];
      triggerToast(`You blocked @${username}. Their posts are now hidden.`);
      if (following.includes(username)) {
        const updatedFollowing = following.filter(f => f !== username);
        setFollowing(updatedFollowing);
        localStorage.setItem('stagecore_following', JSON.stringify(updatedFollowing));
      }
    }
    setBlockedUsers(updatedBlocked);
    localStorage.setItem('stagecore_blocked_users', JSON.stringify(updatedBlocked));
    window.dispatchEvent(new Event('storage'));
  };

  const handleSubmitReport = (e, postId) => {
    if (e) e.preventDefault();
    triggerToast('Report submitted! StageCore moderators will review this post.');
    setReportingPost(null);
  };

  // Sync and event listener
  const savePosts = (newPosts) => {
    setPosts(newPosts);
    localStorage.setItem('stagecore_posts_feed', JSON.stringify(newPosts));
    window.dispatchEvent(new Event('posts_changed'));
  };

  useEffect(() => {
    const handlePostsChanged = () => {
      try {
        const saved = localStorage.getItem('stagecore_posts_feed');
        if (saved) setPosts(JSON.parse(saved));
      } catch (e) {}
    };
    window.addEventListener('posts_changed', handlePostsChanged);
    return () => window.removeEventListener('posts_changed', handlePostsChanged);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const savedFollowing = localStorage.getItem('stagecore_following');
        if (savedFollowing) setFollowing(JSON.parse(savedFollowing));
        
        const savedMuted = localStorage.getItem('stagecore_muted_users');
        if (savedMuted) setMutedUsers(JSON.parse(savedMuted));
        
        const savedBlocked = localStorage.getItem('stagecore_blocked_users');
        if (savedBlocked) setBlockedUsers(JSON.parse(savedBlocked));
      } catch (e) {}
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleMediaFileChange = (e, mediaKind) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit for client-side uploads. Please choose a smaller file.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedMediaUrl(reader.result);
        setGifUrl(''); // clear GIF if file uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  // Publish new social post
  const handleCreatePost = (e) => {
    if (e) e.preventDefault();

    const hasText = !!newPostText.trim();
    const hasMedia = !!uploadedMediaUrl;
    const hasGif = !!gifUrl;
    const hasPoll = showPollCreator && pollOptions.filter(o => o.trim()).length >= 2;

    if (!hasText && !hasMedia && !hasGif && !hasPoll) {
      triggerToast('Please write a status, add media, or configure a poll!');
      return;
    }

    let finalImage = '';
    let finalVideo = '';
    let finalPoll = null;

    if (hasMedia) {
      if (uploadedMediaUrl.startsWith('data:image') || uploadedMediaUrl.startsWith('http')) {
        finalImage = uploadedMediaUrl;
      } else {
        finalVideo = uploadedMediaUrl;
      }
    } else if (hasGif) {
      finalImage = gifUrl;
    }

    if (showPollCreator) {
      const validOptions = pollOptions.filter(o => o.trim());
      if (validOptions.length < 2) {
        triggerToast('Poll must have at least 2 options!');
        return;
      }
      finalPoll = {
        question: newPostText.trim() || 'Community Poll:',
        options: validOptions.map(o => ({ text: o.trim(), votes: 0 })),
        voters: []
      };
    }

    const newPost = {
      id: `post_${Date.now()}`,
      username: ign,
      avatar: avatar,
      time: scheduledDate ? `Scheduled for ${new Date(scheduledDate).toLocaleString()}` : 'Just now',
      content: newPostText.trim(),
      type: finalPoll ? 'poll' : (finalVideo ? 'video' : (finalImage ? 'image' : 'text')),
      image: finalImage,
      video: finalVideo,
      poll: finalPoll,
      likes: 0,
      comments: [],
      isLiked: false,
      scheduledTime: scheduledDate ? new Date(scheduledDate).toLocaleString() : null
    };

    savePosts([newPost, ...posts]);

    // Reset inputs
    setNewPostText('');
    setUploadedMediaUrl('');
    setGifUrl('');
    setShowPollCreator(false);
    setPollOptions(['', '']);
    setShowEmojiPicker(false);
    setShowGifPicker(false);
    setShowSchedulePicker(false);
    setScheduledDate('');

    triggerToast(scheduledDate ? 'Post scheduled successfully!' : 'Social post published to feed!');
  };

  // Like a post
  const handleLikePost = (postId) => {
    const newPosts = posts.map(post => {
      if (post.id === postId) {
        const isLiked = !post.isLiked;
        return {
          ...post,
          isLiked,
          likes: isLiked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    });
    savePosts(newPosts);
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    savePosts(updatedPosts);
    triggerToast('Post deleted successfully!');
  };

  const handlePinPost = (postId) => {
    const newPosts = posts.map(post => {
      if (post.id === postId) {
        const nextPin = !post.isPinned;
        triggerToast(nextPin ? 'Post pinned to your profile!' : 'Post unpinned.');
        return { ...post, isPinned: nextPin };
      }
      return post;
    });
    savePosts(newPosts);
    setActiveMenuPostId(null);
  };

  const handleHighlightPost = (postId) => {
    const newPosts = posts.map(post => {
      if (post.id === postId) {
        const nextHighlight = !post.isHighlighted;
        triggerToast(nextHighlight ? 'Post highlighted on your profile!' : 'Post removed from highlights.');
        return { ...post, isHighlighted: nextHighlight };
      }
      return post;
    });
    savePosts(newPosts);
    setActiveMenuPostId(null);
  };

  const handleStartEdit = (post) => {
    setEditingPostId(post.id);
    setEditingText(post.content);
    setActiveMenuPostId(null);
  };

  const handleSaveEdit = (postId) => {
    if (!editingText.trim()) return;
    const newPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, content: editingText.trim() };
      }
      return post;
    });
    savePosts(newPosts);
    setEditingPostId(null);
    setEditingText('');
    triggerToast('Post updated successfully!');
  };

  const handleAddToList = (postId) => {
    triggerToast('Post added/removed from your custom bookmarks lists!');
    setActiveMenuPostId(null);
  };

  const handleSaveReplyPermission = (postId, permission) => {
    const newPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, replyPermission: permission };
      }
      return post;
    });
    savePosts(newPosts);
    setReplyPermissionPost(null);
    triggerToast(`Who can reply changed to: ${permission}`);
  };

  const handleRequestCommunityNote = (e, postId) => {
    e.preventDefault();
    if (!noteRequestReason.trim()) return;
    const newPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, communityNoteRequested: true, communityNoteReason: noteRequestReason.trim() };
      }
      return post;
    });
    savePosts(newPosts);
    setCommunityNotePost(null);
    setNoteRequestReason('');
    triggerToast('Community Note request submitted for review!');
  };

  // Comment on a post
  const handleAddComment = (e, postId) => {
    e.preventDefault();
    const commentText = commentInputs[postId] || '';
    if (!commentText.trim()) return;

    const newPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, { username: ign, text: commentText.trim() }]
        };
      }
      return post;
    });
    savePosts(newPosts);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    triggerToast('Comment added!');
  };

  const getPreviewUrl = () => {
    if (postType === 'image' || postType === 'video') {
      return uploadedMediaUrl;
    }
    return '';
  };

  const previewUrl = getPreviewUrl();

  return (
    <div className="space-y-6 text-left animate-fadeIn relative">
      
      {/* Toast Alert Popups */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-gaming-purple text-white font-extrabold text-[10px] uppercase tracking-wider py-2.5 px-4 rounded-xl border border-gaming-purple/40 shadow-lg shadow-gaming-purple/10 animate-slideRight">
          <Check size={14} />
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <Globe className="text-gaming-purple" size={24} />
            Social Feed
          </h1>
          <p className="text-xs text-gray-400 font-semibold tracking-wider mt-1">
            Connect with the community, share match highlights, and engage with other players.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: Create Post Box (Twitter/X Composer Style) */}
        <div className="glass-panel border border-white/5 rounded-2xl p-4 bg-[#03050f]/60 space-y-4">
          <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-white/5 pb-2.5">
            <Plus size={14} className="text-gaming-purple" />
            What's happening?
          </h3>
          
          <div className="flex gap-3 text-left">
            {/* User Avatar */}
            <div className="w-9 h-9 rounded-full bg-gaming-purple/15 border border-gaming-purple/35 flex items-center justify-center font-black text-white shrink-0 overflow-hidden select-none">
              {avatar && (avatar.startsWith('http') || avatar.startsWith('/') || avatar.startsWith('data:')) ? (
                <img src={avatar} alt={ign} className="w-full h-full object-cover" />
              ) : (
                avatar || '🎮'
              )}
            </div>

            {/* Composer inputs and action bar */}
            <div className="flex-1 space-y-3">
              <textarea
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="What's happening?"
                rows={3}
                className="w-full bg-transparent border-0 text-white text-[12px] font-medium placeholder-gray-600 focus:outline-none focus:ring-0 resize-none font-sans leading-relaxed p-0"
              />

              {/* Media File Upload Preview */}
              {uploadedMediaUrl && (
                <div className="relative rounded-xl overflow-hidden bg-black/40 border border-white/10 max-h-44 flex items-center justify-center animate-fadeIn group">
                  {uploadedMediaUrl.startsWith('data:image') || uploadedMediaUrl.startsWith('http') ? (
                    <img src={uploadedMediaUrl} alt="Upload preview" className="w-full h-full object-cover max-h-44" />
                  ) : (
                    <video src={uploadedMediaUrl} className="w-full h-full object-cover max-h-44" muted autoPlay loop playsInline />
                  )}
                  <button 
                    type="button"
                    onClick={() => setUploadedMediaUrl('')}
                    className="absolute top-2 right-2 p-1 bg-black/75 hover:bg-black/90 text-white rounded-full transition-colors cursor-pointer border-0"
                  >
                    <X size={10} />
                  </button>
                </div>
              )}

              {/* GIF Preview */}
              {gifUrl && (
                <div className="relative rounded-xl overflow-hidden bg-black/40 border border-white/10 max-h-44 flex items-center justify-center animate-fadeIn group">
                  <img src={gifUrl} alt="GIF preview" className="w-full h-full object-cover max-h-44" />
                  <button 
                    type="button"
                    onClick={() => setGifUrl('')}
                    className="absolute top-2 right-2 p-1 bg-black/75 hover:bg-black/90 text-white rounded-full transition-colors cursor-pointer border-0"
                  >
                    <X size={10} />
                  </button>
                </div>
              )}

              {/* Poll Creator Form */}
              {showPollCreator && (
                <div className="space-y-2 p-3 bg-black/40 border border-white/5 rounded-xl animate-fadeIn text-[10px] relative">
                  <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Create Poll</span>
                  <div className="space-y-2">
                    {pollOptions.map((opt, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <input
                          type="text"
                          placeholder={`Option ${idx + 1}`}
                          value={opt}
                          onChange={(e) => {
                            const newOpts = [...pollOptions];
                            newOpts[idx] = e.target.value;
                            setPollOptions(newOpts);
                          }}
                          className="flex-1 bg-[#050816] border border-white/10 rounded-lg px-3 py-1.5 text-[10px] text-white focus:outline-none focus:border-gaming-purple/40 placeholder-gray-700 font-semibold"
                        />
                        {pollOptions.length > 2 && (
                          <button
                            type="button"
                            onClick={() => setPollOptions(pollOptions.filter((_, i) => i !== idx))}
                            className="p-1 hover:bg-red-500/10 text-red-400 rounded-lg transition-colors cursor-pointer border-0 bg-transparent"
                          >
                            <X size={10} />
                          </button>
                        )}
                      </div>
                    ))}
                    {pollOptions.length < 4 && (
                      <button
                        type="button"
                        onClick={() => setPollOptions([...pollOptions, ''])}
                        className="text-[8px] text-gaming-purple hover:text-gaming-purple/80 font-bold uppercase tracking-wider cursor-pointer border-0 bg-transparent"
                      >
                        + Add option
                      </button>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPollCreator(false);
                      setPollOptions(['', '']);
                    }}
                    className="absolute top-3 right-3 text-gray-500 hover:text-white cursor-pointer border-0 bg-transparent"
                  >
                    <X size={10} />
                  </button>
                </div>
              )}

              {/* Schedule Picker Form */}
              {showSchedulePicker && (
                <div className="p-3 bg-black/40 border border-white/5 rounded-xl animate-fadeIn text-[10px] space-y-2 relative">
                  <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Schedule Post</span>
                  <input
                    type="datetime-local"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full bg-[#050816] border border-white/10 rounded-lg px-3 py-1.5 text-[10px] text-white focus:outline-none focus:border-gaming-purple/40 font-semibold"
                  />
                  {scheduledDate && (
                    <div className="text-[8px] text-amber-400 font-semibold uppercase tracking-wider">
                      Will schedule for: {new Date(scheduledDate).toLocaleString()}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setShowSchedulePicker(false);
                      setScheduledDate('');
                    }}
                    className="absolute top-3 right-3 text-gray-500 hover:text-white cursor-pointer border-0 bg-transparent"
                  >
                    <X size={10} />
                  </button>
                </div>
              )}

              {/* Preset Gaming Image Selector Panel */}
              {showImagePresets && (
                <div className="p-3 bg-[#050816] border border-white/10 rounded-xl animate-fadeIn text-[10px] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block font-sans">Featured Esports Images</span>
                    <button type="button" onClick={() => setShowImagePresets(false)} className="text-gray-500 hover:text-white cursor-pointer border-0 bg-transparent">
                      <X size={12} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { name: '🏆 Trophy Win', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop' },
                      { name: '🎯 RGB Setup', url: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1000&auto=format&fit=crop' },
                      { name: '💥 Live Arena', url: 'https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=1000&auto=format&fit=crop' },
                      { name: '⚡ Cyber Rig', url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop' },
                      { name: '⚔️ Squad Brief', url: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=1000&auto=format&fit=crop' }
                    ].map(img => (
                      <button
                        key={img.name}
                        type="button"
                        onClick={() => {
                          setUploadedMediaUrl(img.url);
                          setGifUrl('');
                          setShowImagePresets(false);
                        }}
                        className="relative rounded-lg overflow-hidden border border-white/10 hover:border-gaming-purple transition-all h-20 group cursor-pointer border-0 bg-transparent text-left"
                      >
                        <img src={img.url} alt={img.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-1 text-[8px] text-white font-extrabold truncate">
                          {img.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* GIF Selector Panel */}
              {showGifPicker && (
                <div className="p-3 bg-[#050816] border border-white/5 rounded-xl animate-fadeIn text-[10px] space-y-2">
                  <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block font-sans">Choose Gaming GIF</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: 'Clutch', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3R6Zzh0Y2tqdzV3dzB1MXl0am5hNWd6Z2tzYXRybDB1MHhhbHplZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/a3IWyYGLRZqJhNJfWZ/giphy.gif' },
                      { name: 'Victory', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3h2NjN1ajhpcnpxeXphYzhudnV3amVyeTZhcGtzNGt6dHdrZm94NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKuylrX8kT7vTov/giphy.gif' },
                      { name: 'Aimbot', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2R4OTBndjd3dzAyd3J5ZHBsdXlreWV1bmR4YnQ1MmdpdDJ1cDJyeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3q2t2KAQQvspDVPW/giphy.gif' },
                      { name: 'Rage Quit', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjYxZ3BsbWphZjd2dWg4dTFxYzh5dnF5Z3NpaG9xYmtidTRiaThubSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d3mlE7uhX8KFgEmY/giphy.gif' }
                    ].map(gif => (
                      <button
                        key={gif.name}
                        type="button"
                        onClick={() => {
                          setGifUrl(gif.url);
                          setUploadedMediaUrl(''); // clear file upload
                          setShowGifPicker(false);
                        }}
                        className="relative rounded-lg overflow-hidden border border-white/5 hover:border-gaming-purple transition-all h-16 group cursor-pointer border-0 bg-transparent"
                      >
                        <img src={gif.url} alt={gif.name} className="w-full h-full object-cover" />
                        <span className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[8px] text-white font-extrabold uppercase transition-opacity">
                          {gif.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Emoji Picker Panel */}
              {showEmojiPicker && (
                <div className="p-3 bg-[#050816] border border-white/5 rounded-xl animate-fadeIn text-[10px] space-y-2">
                  <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block font-sans">Insert Emoji</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['🎮', '⚡', '👑', '👾', '🔥', '🎯', '🛡️', '🤖', '🚀', '💀', '💎', '😂', '👍', '🙌', '💯'].map(emoji => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => {
                          setNewPostText(newPostText + emoji);
                          setShowEmojiPicker(false);
                        }}
                        className="w-7 h-7 bg-white/5 hover:bg-gaming-purple border border-transparent rounded-lg flex items-center justify-center font-black text-sm transition-all cursor-pointer border-0"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action row */}
              <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-2">
                <div className="flex items-center gap-1.5">
                  {/* File Upload Selector (Media) */}
                  <label className="p-2 hover:bg-white/5 text-[#1D9BF0] rounded-xl cursor-pointer transition-colors relative block" title="Upload Local Image/Video">
                    <Image size={14} />
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={(e) => handleMediaFileChange(e, 'media')}
                      className="hidden"
                    />
                  </label>

                  {/* Preset Gaming Images Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowImagePresets(!showImagePresets);
                      setShowGifPicker(false);
                      setShowEmojiPicker(false);
                      setShowPollCreator(false);
                      setShowSchedulePicker(false);
                    }}
                    className={`px-2 py-1 rounded-xl text-[9px] font-extrabold uppercase transition-colors cursor-pointer border-0 flex items-center gap-1 ${
                      showImagePresets ? 'bg-gaming-purple text-white' : 'bg-white/5 hover:bg-white/10 text-gaming-purple'
                    }`}
                    title="Choose Featured Esports Image"
                  >
                    <Sparkles size={11} /> Presets
                  </button>
                  
                  {/* GIF Trigger */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowGifPicker(!showGifPicker);
                      setShowEmojiPicker(false);
                      setShowPollCreator(false);
                      setShowSchedulePicker(false);
                    }}
                    className={`p-2 rounded-xl transition-colors cursor-pointer border-0 bg-transparent flex items-center justify-center ${
                      showGifPicker ? 'bg-[#1D9BF0]/20 text-[#1D9BF0]' : 'hover:bg-white/5 text-[#1D9BF0]'
                    }`}
                    title="Insert GIF"
                  >
                    <span className="text-[8px] font-black border border-[#1D9BF0]/50 px-1 rounded font-sans leading-none py-0.5">GIF</span>
                  </button>

                  {/* Poll Trigger */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowPollCreator(!showPollCreator);
                      setShowGifPicker(false);
                      setShowEmojiPicker(false);
                      setShowSchedulePicker(false);
                    }}
                    className={`p-2 rounded-xl transition-colors cursor-pointer border-0 bg-transparent flex flex-col gap-0.5 items-center justify-center ${
                      showPollCreator ? 'bg-[#1D9BF0]/20 text-[#1D9BF0]' : 'hover:bg-white/5 text-[#1D9BF0]'
                    }`}
                    title="Add Poll"
                  >
                    <span className="w-3.5 h-[1.5px] bg-current rounded-full block" />
                    <span className="w-3.5 h-[1.5px] bg-current rounded-full block" />
                    <span className="w-3.5 h-[1.5px] bg-current rounded-full block" />
                  </button>

                  {/* Emoji Trigger */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowEmojiPicker(!showEmojiPicker);
                      setShowGifPicker(false);
                      setShowPollCreator(false);
                      setShowSchedulePicker(false);
                    }}
                    className={`p-2 rounded-xl transition-colors cursor-pointer border-0 bg-transparent flex items-center justify-center text-[13px] ${
                      showEmojiPicker ? 'bg-[#1D9BF0]/20 text-[#1D9BF0]' : 'hover:bg-white/5 text-[#1D9BF0]'
                    }`}
                    title="Insert Emoji"
                  >
                    <Smile size={14} />
                  </button>

                  {/* Schedule Post Trigger */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowSchedulePicker(!showSchedulePicker);
                      setShowGifPicker(false);
                      setShowEmojiPicker(false);
                      setShowPollCreator(false);
                    }}
                    className={`p-2 rounded-xl transition-colors cursor-pointer border-0 bg-transparent flex items-center justify-center ${
                      showSchedulePicker ? 'bg-[#1D9BF0]/20 text-[#1D9BF0]' : 'hover:bg-white/5 text-[#1D9BF0]'
                    }`}
                    title="Schedule Post"
                  >
                    <Calendar size={14} />
                  </button>
                </div>

                {/* Publish Button */}
                <button
                  onClick={handleCreatePost}
                  disabled={!newPostText.trim() && !uploadedMediaUrl && !gifUrl && (!showPollCreator || !pollOptions.some(o => o.trim()))}
                  className="py-1.5 px-4 bg-[#1D9BF0] hover:bg-[#1A8CD8] disabled:opacity-40 disabled:hover:bg-[#1D9BF0] text-white text-[11px] font-bold rounded-full transition-all cursor-pointer border-0"
                >
                  {scheduledDate ? 'Schedule' : 'Post'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Scrollable Feed */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
            <MessageSquare size={14} className="text-gaming-purple" />
            Social Feed List
          </h3>

          {posts.filter(p => !mutedUsers.includes(p.username) && !blockedUsers.includes(p.username)).length === 0 ? (
            <div className="glass-panel py-20 text-center rounded-2xl border border-white/5">
              <MessageSquare size={48} className="text-gray-700 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-white mb-1">Social feed empty</h3>
              <p className="text-xs text-gray-500">No posts to display (or user accounts are muted/blocked).</p>
            </div>
          ) : (
            posts.filter(p => !mutedUsers.includes(p.username) && !blockedUsers.includes(p.username)).map(post => (
              <div key={post.id} className="glass-panel border border-white/5 rounded-2xl bg-[#03050f]/30 overflow-hidden shadow-xl hover:border-white/10 transition-colors">
                
                {/* Card Header details */}
                <div className="p-4 flex items-center justify-between border-b border-white/5 relative">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gaming-purple/15 border border-gaming-purple/35 flex items-center justify-center font-black text-white shadow text-lg shrink-0 overflow-hidden">
                      {post.avatar && (post.avatar.startsWith('http') || post.avatar.startsWith('/') || post.avatar.startsWith('data:')) ? (
                        <img src={post.avatar} alt={post.username} className="w-full h-full object-cover" />
                      ) : (
                        post.avatar || '🎮'
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-extrabold text-white block uppercase tracking-wide">{post.username}</span>
                        {post.isPinned && (
                          <span className="text-[8px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/35 px-1.5 py-0.2 rounded uppercase font-black tracking-wider">
                            📌 Pinned
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] text-gray-500 font-mono block mt-0.5">
                        {post.time} {post.replyPermission && post.replyPermission !== 'everyone' && `• Replies restricted to ${post.replyPermission}`}
                      </span>
                    </div>
                  </div>

                  {/* Three Dot Options Button */}
                  <div className="relative">
                    <button
                      onClick={() => setActiveMenuPostId(activeMenuPostId === post.id ? null : post.id)}
                      className="p-1.5 hover:bg-white/5 text-gray-500 hover:text-white rounded-lg transition-colors cursor-pointer border-0 bg-transparent flex items-center justify-center"
                      title="Post Options"
                    >
                      <MoreHorizontal size={15} />
                    </button>

                    {/* Dropdown Menu */}
                    {activeMenuPostId === post.id && (
                      <div className="absolute right-0 top-8 z-30 w-48 bg-[#090d22] border border-white/10 rounded-xl shadow-2xl py-1 text-[10px] text-left divide-y divide-white/5 overflow-hidden animate-fadeIn">
                        {post.username === ign ? (
                          <>
                            {/* Owner only options */}
                            <div className="py-1">
                              <button
                                onClick={() => handleStartEdit(post)}
                                className="w-full px-3 py-1.5 hover:bg-white/5 text-gray-300 hover:text-white flex items-center gap-2 cursor-pointer border-0 bg-transparent text-left font-bold"
                              >
                                <Pencil size={11} className="text-gray-400" />
                                Edit
                              </button>
                              <button
                                onClick={() => handlePinPost(post.id)}
                                className="w-full px-3 py-1.5 hover:bg-white/5 text-gray-300 hover:text-white flex items-center gap-2 cursor-pointer border-0 bg-transparent text-left font-bold"
                              >
                                <Pin size={11} className="text-gray-400" />
                                {post.isPinned ? 'Unpin from profile' : 'Pin to your profile'}
                              </button>
                              <button
                                onClick={() => handleHighlightPost(post.id)}
                                className="w-full px-3 py-1.5 hover:bg-white/5 text-gray-300 hover:text-white flex items-center gap-2 cursor-pointer border-0 bg-transparent text-left font-bold"
                              >
                                <Sparkles size={11} className="text-gray-400" />
                                {post.isHighlighted ? 'Unhighlight post' : 'Highlight on your profile'}
                              </button>
                              <button
                                onClick={() => setReplyPermissionPost(post)}
                                className="w-full px-3 py-1.5 hover:bg-white/5 text-gray-300 hover:text-white flex items-center gap-2 cursor-pointer border-0 bg-transparent text-left font-bold"
                              >
                                <MessageCircle size={11} className="text-gray-400" />
                                Change who can reply
                              </button>
                            </div>

                            {/* General options for owner */}
                            <div className="py-1">
                              <button
                                onClick={() => handleAddToList(post.id)}
                                className="w-full px-3 py-1.5 hover:bg-white/5 text-gray-300 hover:text-white flex items-center gap-2 cursor-pointer border-0 bg-transparent text-left font-bold"
                              >
                                <List size={11} className="text-gray-400" />
                                Add/remove from Lists
                              </button>
                              <button
                                onClick={() => {
                                  setActivityPost(post);
                                  setActiveMenuPostId(null);
                                }}
                                className="w-full px-3 py-1.5 hover:bg-white/5 text-gray-300 hover:text-white flex items-center gap-2 cursor-pointer border-0 bg-transparent text-left font-bold"
                              >
                                <BarChart2 size={11} className="text-gray-400" />
                                View post activity
                              </button>
                              <button
                                onClick={() => {
                                  setAnalyticsPost(post);
                                  setActiveMenuPostId(null);
                                }}
                                className="w-full px-3 py-1.5 hover:bg-white/5 text-gray-300 hover:text-white flex items-center gap-2 cursor-pointer border-0 bg-transparent text-left font-bold"
                              >
                                <TrendingUp size={11} className="text-gray-400" />
                                View post analytics
                              </button>
                              <button
                                onClick={() => {
                                  setCommunityNotePost(post);
                                  setActiveMenuPostId(null);
                                }}
                                className="w-full px-3 py-1.5 hover:bg-white/5 text-gray-300 hover:text-white flex items-center gap-2 cursor-pointer border-0 bg-transparent text-left font-bold"
                              >
                                <AlertCircle size={11} className="text-gray-400" />
                                Request Community Note
                              </button>
                            </div>

                            <div className="py-1">
                              <button
                                onClick={() => {
                                  if (window.confirm("Are you sure you want to delete this social post?")) {
                                    handleDeletePost(post.id);
                                  }
                                  setActiveMenuPostId(null);
                                }}
                                className="w-full px-3 py-1.5 hover:bg-red-500/10 text-red-400 flex items-center gap-2 cursor-pointer border-0 bg-transparent text-left font-bold"
                              >
                                <Trash2 size={11} className="text-red-400" />
                                Delete
                              </button>
                            </div>
                          </>
                        ) : (
                          /* Other user's post options */
                          <div className="py-1">
                            <button
                              onClick={() => {
                                handleToggleFollow(post.username);
                                setActiveMenuPostId(null);
                              }}
                              className="w-full px-3 py-1.5 hover:bg-white/5 text-gray-300 hover:text-white flex items-center gap-2 cursor-pointer border-0 bg-transparent text-left font-bold"
                            >
                              {following.includes(post.username) ? (
                                <>
                                  <UserCheck size={11} className="text-gray-400" />
                                  Unfollow @{post.username}
                                </>
                              ) : (
                                <>
                                  <UserPlus size={11} className="text-gray-400" />
                                  Follow @{post.username}
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => {
                                handleToggleMute(post.username);
                                setActiveMenuPostId(null);
                              }}
                              className="w-full px-3 py-1.5 hover:bg-white/5 text-gray-300 hover:text-white flex items-center gap-2 cursor-pointer border-0 bg-transparent text-left font-bold"
                            >
                              {mutedUsers.includes(post.username) ? (
                                <>
                                  <Volume2 size={11} className="text-gray-400" />
                                  Unmute
                                </>
                              ) : (
                                <>
                                  <VolumeX size={11} className="text-gray-400" />
                                  Mute
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => {
                                handleToggleBlock(post.username);
                                setActiveMenuPostId(null);
                              }}
                              className="w-full px-3 py-1.5 hover:bg-white/5 text-gray-300 hover:text-white flex items-center gap-2 cursor-pointer border-0 bg-transparent text-left font-bold"
                            >
                              {blockedUsers.includes(post.username) ? (
                                <>
                                  <Ban size={11} className="text-gray-400" />
                                  Unblock @{post.username}
                                </>
                              ) : (
                                <>
                                  <Ban size={11} className="text-gray-400" />
                                  Block @{post.username}
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => {
                                setActivityPost(post);
                                setActiveMenuPostId(null);
                              }}
                              className="w-full px-3 py-1.5 hover:bg-white/5 text-gray-300 hover:text-white flex items-center gap-2 cursor-pointer border-0 bg-transparent text-left font-bold"
                            >
                              <BarChart2 size={11} className="text-gray-400" />
                              View post activity
                            </button>
                            <button
                              onClick={() => {
                                setReportingPost(post);
                                setActiveMenuPostId(null);
                              }}
                              className="w-full px-3 py-1.5 hover:bg-red-500/10 text-red-400 flex items-center gap-2 cursor-pointer border-0 bg-transparent text-left font-bold"
                            >
                              <Flag size={11} className="text-red-400" />
                              Report post
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Caption content or Edit Form */}
                {editingPostId === post.id ? (
                  <div className="p-4 space-y-3">
                    <textarea
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      rows={2}
                      className="w-full bg-[#050816] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-gaming-purple/40 resize-none font-semibold"
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => setEditingPostId(null)}
                        className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold rounded-lg cursor-pointer border-0 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveEdit(post.id)}
                        className="px-3 py-1.5 bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white text-[10px] font-bold rounded-lg cursor-pointer border-0 transition-colors"
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                ) : (
                  post.content && (
                    <div className="p-4 text-xs font-semibold leading-relaxed text-gray-300 text-left">
                      {post.content}
                    </div>
                  )
                )}

                {/* Poll Card if present */}
                {post.poll && (
                  <div className="px-4 pb-4 space-y-2 text-left animate-fadeIn">
                    {post.poll.options.map((opt, oIdx) => {
                      const totalVotes = post.poll.options.reduce((sum, o) => sum + o.votes, 0);
                      const percent = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
                      const hasVoted = post.poll.voters.includes(ign);
                      
                      return (
                        <button
                          key={oIdx}
                          onClick={() => {
                            if (hasVoted) return; // already voted
                            // Increment vote
                            const updatedPosts = posts.map(p => {
                              if (p.id === post.id) {
                                const newOptions = p.poll.options.map((o, idx) => {
                                  if (idx === oIdx) return { ...o, votes: o.votes + 1 };
                                  return o;
                                });
                                return {
                                  ...p,
                                  poll: {
                                    ...p.poll,
                                    options: newOptions,
                                    voters: [...p.poll.voters, ign]
                                  }
                                };
                              }
                              return p;
                            });
                            savePosts(updatedPosts);
                            triggerToast('Vote cast successfully!');
                          }}
                          className={`w-full relative flex items-center justify-between p-2.5 rounded-xl border text-[10px] font-bold overflow-hidden transition-all border-white/5 bg-transparent ${
                            hasVoted 
                              ? 'text-white cursor-default' 
                              : 'hover:border-gaming-purple/40 text-gray-300 cursor-pointer'
                          }`}
                        >
                          {/* Progress bar background fill for results */}
                          {hasVoted && (
                            <div 
                              className="absolute left-0 top-0 bottom-0 bg-gaming-purple/20 transition-all duration-300" 
                              style={{ width: `${percent}%` }}
                            />
                          )}
                          <span className="relative z-10">{opt.text}</span>
                          {hasVoted && (
                            <span className="relative z-10 text-[9px] text-gaming-purple font-mono">
                              {percent}% ({opt.votes})
                            </span>
                          )}
                        </button>
                      );
                    })}
                    <div className="text-[8px] text-gray-500 font-bold uppercase tracking-wider">
                      {post.poll.options.reduce((sum, o) => sum + o.votes, 0)} votes • {post.poll.voters.includes(ign) ? 'Voted' : 'Vote now'}
                    </div>
                  </div>
                )}

                {/* Post Video highlight if present */}
                {post.video && (
                  <div className="w-full overflow-hidden border-y border-white/5 bg-black relative">
                    <video 
                      src={post.video} 
                      controls 
                      className="w-full max-h-[350px] object-contain"
                      muted
                      preload="metadata"
                    />
                  </div>
                )}

                {/* Post Image Cover if present (only if no video is present) */}
                {post.image && !post.video && (
                  <div className="w-full max-h-[300px] overflow-hidden border-y border-white/5 bg-black/40">
                    <img 
                      src={post.image} 
                      alt="Post banner highlight"
                      className="w-full h-full object-cover max-h-[300px]"
                      onError={e => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Card Footer Actions */}
                <div className="p-4 bg-[#03050f]/60 space-y-4">
                  <div className="flex items-center gap-5">
                    {/* Like button toggle */}
                    <button 
                      onClick={() => handleLikePost(post.id)}
                      className="flex items-center gap-1.5 text-[10px] uppercase font-black tracking-wider text-gray-400 hover:text-pink-500 cursor-pointer transition-colors"
                    >
                      <Heart size={14} className={post.isLiked ? "fill-pink-500 text-pink-500" : "text-gray-400"} />
                      <span>{post.likes} Likes</span>
                    </button>
                    
                    {/* Comments count */}
                    <span className="flex items-center gap-1.5 text-[10px] uppercase font-black tracking-wider text-gray-400">
                      <MessageSquare size={14} />
                      <span>{post.comments.length} Comments</span>
                    </span>
                  </div>

                  {/* Comments list display */}
                  {post.comments.length > 0 && (
                    <div className="space-y-2 border-t border-white/5 pt-3">
                      {post.comments.map((comm, idx) => (
                        <div key={idx} className="text-[11px] leading-relaxed text-left flex gap-1.5">
                          <span className="font-extrabold text-white uppercase tracking-wider whitespace-nowrap">{comm.username}:</span>
                          <span className="text-gray-400 font-semibold">{comm.text}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add comments field */}
                  <form onSubmit={(e) => handleAddComment(e, post.id)} className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
                    <input
                      type="text"
                      placeholder="Write a social comment..."
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                      className="flex-1 bg-[#050816] border border-white/10 rounded-xl px-4 py-2 text-[10px] text-white focus:outline-none focus:border-gaming-purple/40 placeholder-gray-600 font-semibold"
                    />
                    <button type="submit" className="p-2 bg-gaming-purple hover:bg-gaming-purple/90 text-white rounded-xl transition-all cursor-pointer">
                      <Send size={10} />
                    </button>
                  </form>
                </div>

              </div>
            ))
          )}
        </div>
      </div>

      {/* Activity Modal */}
      {activityPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-sm bg-[#090d22]/95 border border-white/10 rounded-2xl p-6 relative shadow-2xl text-left text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                <BarChart2 size={14} className="text-[#1D9BF0]" />
                Post Activity
              </h3>
              <button 
                onClick={() => setActivityPost(null)}
                className="p-1 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer border-0 bg-transparent"
              >
                <X size={14} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-white/2 border border-white/5 rounded-xl p-3">
                  <span className="text-[8px] text-gray-500 font-extrabold uppercase">Impressions</span>
                  <span className="text-white font-black text-sm block mt-0.5">{(1250).toLocaleString()}</span>
                </div>
                <div className="bg-white/2 border border-white/5 rounded-xl p-3">
                  <span className="text-[8px] text-gray-500 font-extrabold uppercase">Detail Expands</span>
                  <span className="text-white font-black text-sm block mt-0.5">342</span>
                </div>
                <div className="bg-white/2 border border-white/5 rounded-xl p-3">
                  <span className="text-[8px] text-gray-500 font-extrabold uppercase">Profile Visits</span>
                  <span className="text-white font-black text-sm block mt-0.5">85</span>
                </div>
                <div className="bg-white/2 border border-white/5 rounded-xl p-3">
                  <span className="text-[8px] text-gray-500 font-extrabold uppercase">Link Clicks</span>
                  <span className="text-white font-black text-sm block mt-0.5">18</span>
                </div>
              </div>
              <p className="text-[9.5px] text-gray-500 font-medium leading-relaxed">
                Activity data represents the total times users interacted or viewed this post on their home feed, search feeds, and profile lists.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {analyticsPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-sm bg-[#090d22]/95 border border-white/10 rounded-2xl p-6 relative shadow-2xl text-left text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                <TrendingUp size={14} className="text-[#1D9BF0]" />
                Post Analytics
              </h3>
              <button 
                onClick={() => setAnalyticsPost(null)}
                className="p-1 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer border-0 bg-transparent"
              >
                <X size={14} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white/2 border border-white/5 rounded-xl p-3 text-left">
                <div>
                  <span className="text-[8px] text-gray-500 font-extrabold uppercase">Total Engagement Rate</span>
                  <span className="text-[#1D9BF0] font-black text-lg block mt-0.5">4.8%</span>
                </div>
                <div className="text-right">
                  <span className="text-[8px] text-gray-500 font-extrabold uppercase block">Compared to average</span>
                  <span className="text-emerald-400 font-bold text-[10px] block mt-0.5">+12.4% ↑</span>
                </div>
              </div>

              {/* Engagement Chart Details */}
              <div className="space-y-2">
                <span className="text-[8px] text-gray-500 font-extrabold uppercase">Hourly Engagement Chart</span>
                <div className="h-20 bg-black/40 border border-white/5 rounded-xl flex items-end justify-between p-3 gap-1">
                  {[25, 45, 15, 80, 55, 95, 30, 60, 40, 75].map((val, idx) => (
                    <div key={idx} className="flex-1 bg-[#1D9BF0] rounded-sm transition-all duration-500" style={{ height: `${val}%` }} />
                  ))}
                </div>
                <span className="text-[8px] text-gray-500 font-bold block text-center mt-1">Activity over the last 10 hours</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change Who Can Reply Modal */}
      {replyPermissionPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-xs bg-[#090d22]/95 border border-white/10 rounded-2xl p-5 relative shadow-2xl text-left text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                <MessageCircle size={14} className="text-[#1D9BF0]" />
                Who can reply?
              </h3>
              <button 
                onClick={() => setReplyPermissionPost(null)}
                className="p-1 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer border-0 bg-transparent"
              >
                <X size={14} />
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-[8px] text-gray-500 font-extrabold uppercase block mb-1">Choose who can reply to this post:</span>
              {[
                { id: 'everyone', name: 'Everyone', desc: 'Anyone on StageCore can reply' },
                { id: 'following', name: 'People you follow', desc: 'Only accounts you follow can reply' },
                { id: 'mentioned', name: 'Only people you mention', desc: 'Only accounts mentioned in this post can reply' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleSaveReplyPermission(replyPermissionPost.id, opt.id)}
                  className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    replyPermissionPost.replyPermission === opt.id || (!replyPermissionPost.replyPermission && opt.id === 'everyone')
                      ? 'bg-[#1D9BF0]/15 border-[#1D9BF0]/50 text-white'
                      : 'bg-white/2 hover:bg-white/5 text-gray-300 border border-transparent'
                  }`}
                >
                  <span className="font-extrabold text-[10px] block">{opt.name}</span>
                  <span className="text-[8px] text-gray-500 font-medium block mt-0.5">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Request Community Note Modal */}
      {communityNotePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-sm bg-[#090d22]/95 border border-white/10 rounded-2xl p-6 relative shadow-2xl text-left text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                <AlertCircle size={14} className="text-[#1D9BF0]" />
                Request Community Note
              </h3>
              <button 
                onClick={() => setCommunityNotePost(null)}
                className="p-1 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer border-0 bg-transparent"
              >
                <X size={14} />
              </button>
            </div>

            <form onSubmit={(e) => handleRequestCommunityNote(e, communityNotePost.id)} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[8px] text-gray-500 font-extrabold uppercase tracking-wider block">Reason for request</label>
                <p className="text-[9px] text-gray-400 font-medium leading-normal block -mt-0.5">Provide details on what claims in this post are inaccurate or require additional context:</p>
                <textarea
                  required
                  placeholder="Explain why context is needed (e.g. incorrect match scores, outdated rosters, unverified results)..."
                  value={noteRequestReason}
                  onChange={(e) => setNoteRequestReason(e.target.value)}
                  rows={3}
                  className="w-full bg-[#050816] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-gaming-purple/40 resize-none font-semibold"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCommunityNotePost(null)}
                  className="flex-1 py-2.5 bg-white/3 border border-white/5 hover:bg-white/5 text-white font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer text-center"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Report Post Modal */}
      {reportingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-sm bg-[#090d22]/95 border border-white/10 rounded-2xl p-6 relative shadow-2xl text-left text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Flag size={14} className="text-red-400" />
                Report Post
              </h3>
              <button 
                onClick={() => setReportingPost(null)}
                className="p-1 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer border-0 bg-transparent"
              >
                <X size={14} />
              </button>
            </div>

            <form onSubmit={(e) => handleSubmitReport(e, reportingPost.id)} className="space-y-4">
              <div className="space-y-2">
                <span className="text-[8px] text-gray-500 font-extrabold uppercase block mb-1">Select a reason for reporting this post:</span>
                {[
                  { id: 'spam', name: 'Spam', desc: 'Commercial solicitation, repetitive posts, or links' },
                  { id: 'harassment', name: 'Harassment or abuse', desc: 'Targeted hate, bullying, or aggressive behavior' },
                  { id: 'hate', name: 'Hate speech', desc: 'Slurs, violent threats, or discriminatory behavior' },
                  { id: 'fake_news', name: 'Misleading info / Fake news', desc: 'Untruthful statements, cheating allegations, or falsified match data' },
                  { id: 'other', name: 'Other violation', desc: 'Any other violation of StageCore Terms of Service' }
                ].map(reason => (
                  <label
                    key={reason.id}
                    className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all cursor-pointer ${
                      reportReason === reason.id
                        ? 'bg-red-500/10 border-red-500/40 text-white'
                        : 'bg-white/2 hover:bg-white/5 text-gray-300 border border-transparent'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reportReason"
                      value={reason.id}
                      checked={reportReason === reason.id}
                      onChange={() => setReportReason(reason.id)}
                      className="mt-1 scale-95 accent-red-500 shrink-0"
                    />
                    <div className="text-left">
                      <span className="font-extrabold text-[10px] block">{reason.name}</span>
                      <span className="text-[8px] text-gray-500 font-medium block mt-0.5">{reason.desc}</span>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReportingPost(null)}
                  className="flex-1 py-2.5 bg-white/3 border border-white/5 hover:bg-white/5 text-white font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer text-center font-mono text-[9px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer text-center font-mono text-[9px]"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
