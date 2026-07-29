import React, { useState, useEffect } from 'react';
import { 
  Award, Globe, Search, Check, X, Camera, Settings, Calendar, Smile, Image, Video, Heart, MessageSquare, Send, Trash2, MoreHorizontal, Pencil, Pin, Sparkles, List, MessageCircle, BarChart2, AlertCircle, TrendingUp, UserPlus, UserCheck, UserX, VolumeX, Volume2, Ban, Flag
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import arenaBackground from '../../../assets/images/arena_background.png';

export const ProfileView = ({ defaultTab = 'posts' }) => {
  const { user } = useAuth();
  const [activeSubTab, setActiveSubTab] = useState(defaultTab);
  
  // Custom states for social features
  const defaultFollowing = [
    { username: 'SlayerX', name: 'Slayer Esports', avatar: '⚡', role: 'Pro Duelist' },
    { username: 'JONATHAN', name: 'Jonathan Amaral', avatar: '🔥', role: 'Assaulter' },
    { username: 'Mortal_Pro', name: 'Naman Mathur', avatar: '👑', role: 'IGL' }
  ];

  const defaultFollowers = [
    { username: 'Xeno_Rider', name: 'Xeno', avatar: '🎯', role: 'Sniper' },
    { username: 'KillerFF', name: 'Killer', avatar: '🛡️', role: 'Initiator' },
    { username: 'Viper_Ace', name: 'Viper', avatar: '🐍', role: 'Anchor' },
    { username: 'Coach_Red', name: 'Red Coach', avatar: '📊', role: 'Head Coach' }
  ];

  const [following, setFollowing] = useState(() => {
    try {
      const saved = localStorage.getItem('stagecore_following');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      localStorage.setItem('stagecore_following', JSON.stringify(defaultFollowing));
      return defaultFollowing;
    } catch {
      return defaultFollowing;
    }
  });

  const [activeModal, setActiveModal] = useState(null); // null | 'followers' | 'following'
  const [followers, setFollowers] = useState(() => {
    try {
      const saved = localStorage.getItem('stagecore_followers');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      localStorage.setItem('stagecore_followers', JSON.stringify(defaultFollowers));
      return defaultFollowers;
    } catch {
      return defaultFollowers;
    }
  });

  useEffect(() => {
    localStorage.setItem('stagecore_followers', JSON.stringify(followers));
  }, [followers]);

  // Verified status
  const [isVerified, setIsVerified] = useState(() => {
    return localStorage.getItem('stagecore_verified') === 'true';
  });

  const handleToggleVerify = () => {
    const nextVerify = !isVerified;
    setIsVerified(nextVerify);
    localStorage.setItem('stagecore_verified', nextVerify ? 'true' : 'false');
    triggerToast(nextVerify ? 'Profile verified! Blue checkmark badge unlocked.' : 'Profile verification disabled.');
  };

  // Default fallback posts if storage is empty
  const defaultProfilePosts = [
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

  // Sync posts state from local storage
  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem('stagecore_posts_feed');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    localStorage.setItem('stagecore_posts_feed', JSON.stringify(defaultProfilePosts));
    return defaultProfilePosts;
  });

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

  // Post composer states
  const [newPostText, setNewPostText] = useState('');
  const [uploadedMediaUrl, setUploadedMediaUrl] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [showImagePresets, setShowImagePresets] = useState(false);
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [showSchedulePicker, setShowSchedulePicker] = useState(false);
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [scheduledDate, setScheduledDate] = useState('');
  const [gifUrl, setGifUrl] = useState('');

  // Interactions inputs
  const [findSearchQuery, setFindSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const storedUser = (() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : user;
    } catch {
      return user;
    }
  })();
  const ign = storedUser?.username || 'AnandYT';

  const [currentAvatar, setCurrentAvatar] = useState(() => localStorage.getItem('user_avatar') || '🎮');
  const [currentBannerPreset, setCurrentBannerPreset] = useState(() => localStorage.getItem('user_banner') || 'cyberpunk');
  const [currentBannerImage, setCurrentBannerImage] = useState(() => localStorage.getItem('user_banner_image') || '');
  const [currentIgn, setCurrentIgn] = useState(ign);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editIgn, setEditIgn] = useState(currentIgn);

  const [editAvatarType, setEditAvatarType] = useState(() => {
    const saved = localStorage.getItem('user_avatar') || '🎮';
    return (saved.startsWith('http') || saved.startsWith('/') || saved.startsWith('data:')) ? 'url' : 'emoji';
  });
  const [editAvatarEmoji, setEditAvatarEmoji] = useState(() => {
    const saved = localStorage.getItem('user_avatar') || '🎮';
    return (saved.startsWith('http') || saved.startsWith('/') || saved.startsWith('data:')) ? '🎮' : saved;
  });
  const [editAvatarUrl, setEditAvatarUrl] = useState(() => {
    const saved = localStorage.getItem('user_avatar') || '🎮';
    return (saved.startsWith('http') || saved.startsWith('/') || saved.startsWith('data:')) ? saved : '';
  });

  const [editBannerType, setEditBannerType] = useState(() => {
    const savedImg = localStorage.getItem('user_banner_image');
    return savedImg ? 'url' : 'preset';
  });
  const [editBannerPreset, setEditBannerPreset] = useState(() => localStorage.getItem('user_banner') || 'cyberpunk');
  const [editBannerUrl, setEditBannerUrl] = useState(() => localStorage.getItem('user_banner_image') || '');

  // Update edit form values when profile modal opens
  useEffect(() => {
    if (isEditModalOpen) {
      setEditIgn(currentIgn);
      const savedAv = localStorage.getItem('user_avatar') || '🎮';
      if (savedAv.startsWith('http') || savedAv.startsWith('/') || savedAv.startsWith('data:')) {
        setEditAvatarType('url');
        setEditAvatarUrl(savedAv);
      } else {
        setEditAvatarType('emoji');
        setEditAvatarEmoji(savedAv);
      }
      const savedBImg = localStorage.getItem('user_banner_image');
      if (savedBImg) {
        setEditBannerType('url');
        setEditBannerUrl(savedBImg);
      } else {
        setEditBannerType('preset');
        setEditBannerPreset(localStorage.getItem('user_banner') || 'cyberpunk');
      }
    }
  }, [isEditModalOpen]);

  const handleAvatarFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditAvatarUrl(reader.result);
        setEditAvatarType('url');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditBannerUrl(reader.result);
        setEditBannerType('url');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    
    // Save IGN/Username
    if (editIgn.trim()) {
      setCurrentIgn(editIgn.trim());
      try {
        const saved = localStorage.getItem('user');
        if (saved) {
          const userObj = JSON.parse(saved);
          userObj.username = editIgn.trim();
          localStorage.setItem('user', JSON.stringify(userObj));
        }
      } catch (err) {}
    }

    // Save Avatar
    const finalAvatar = editAvatarType === 'emoji' ? editAvatarEmoji : editAvatarUrl;
    setCurrentAvatar(finalAvatar);
    localStorage.setItem('user_avatar', finalAvatar);

    // Save Banner
    if (editBannerType === 'preset') {
      setCurrentBannerPreset(editBannerPreset);
      localStorage.setItem('user_banner', editBannerPreset);
      localStorage.removeItem('user_banner_image');
      setCurrentBannerImage('');
    } else {
      setCurrentBannerImage(editBannerUrl);
      localStorage.setItem('user_banner_image', editBannerUrl);
    }

    setIsEditModalOpen(false);
    triggerToast('Profile updated successfully!');
    window.dispatchEvent(new Event('storage'));
  };

  const renderAvatar = (avatarData) => {
    if (avatarData && (avatarData.startsWith('http') || avatarData.startsWith('/') || avatarData.startsWith('data:'))) {
      return (
        <img 
          src={avatarData} 
          alt="User Profile" 
          className="w-full h-full rounded-full object-cover"
        />
      );
    }
    return avatarData;
  };

  const bannerPresets = {
    cyberpunk: 'from-[#7C3AED] via-[#FF007F] to-[#050816]',
    frostbite: 'from-[#00F0FF] via-[#3B82F6] to-[#050816]',
    toxic: 'from-[#10B981] via-[#059669] to-[#050816]',
    abyss: 'from-[#EF4444] via-[#7C3AED] to-[#050816]'
  };
  const bannerGradient = bannerPresets[currentBannerPreset] || bannerPresets.cyberpunk;
  const bannerBgImage = currentBannerImage || arenaBackground;

  const knownPlayersMap = {
    'SlayerX': { username: 'SlayerX', name: 'Slayer Esports', avatar: '⚡', role: 'Pro Duelist', game: 'Valorant' },
    'JONATHAN': { username: 'JONATHAN', name: 'Jonathan Amaral', avatar: '🔥', role: 'Assaulter', game: 'BGMI' },
    'Mortal_Pro': { username: 'Mortal_Pro', name: 'Naman Mathur', avatar: '👑', role: 'IGL', game: 'BGMI' },
    'Xeno_Rider': { username: 'Xeno_Rider', name: 'Xeno', avatar: '🎯', role: 'Sniper', game: 'CS2' },
    'KillerFF': { username: 'KillerFF', name: 'Killer', avatar: '🛡️', role: 'Initiator', game: 'Valorant' },
    'Viper_Ace': { username: 'Viper_Ace', name: 'Viper', avatar: '🐍', role: 'Anchor', game: 'Valorant' },
    'Coach_Red': { username: 'Coach_Red', name: 'Red Coach', avatar: '📊', role: 'Head Coach', game: 'BGMI' },
    'StageCore_Official': { username: 'StageCore_Official', name: 'StageCore Official', avatar: '👑', role: 'Tournament Host', game: 'Esports' }
  };

  const getPlayerDetails = (item) => {
    if (item && typeof item === 'object') {
      const u = item.username || item.ign || 'Player';
      const known = knownPlayersMap[u] || {};
      return {
        username: u,
        name: item.name || known.name || u,
        avatar: item.avatar || known.avatar || '🎮',
        role: item.role || known.role || 'Player',
        game: item.game || known.game || 'Valorant'
      };
    }
    const u = String(item || '');
    if (knownPlayersMap[u]) return knownPlayersMap[u];
    return {
      username: u,
      name: u,
      avatar: '🎮',
      role: 'Challenger',
      game: 'Valorant'
    };
  };

  // Sync following list to localStorage
  const handleToggleFollow = (item) => {
    const p = getPlayerDetails(item);
    const targetUsername = p.username;
    
    const isFollowed = following.some(f => (typeof f === 'object' ? f.username : f) === targetUsername);
    let updatedFollowing;
    
    if (isFollowed) {
      updatedFollowing = following.filter(f => (typeof f === 'object' ? f.username : f) !== targetUsername);
      triggerToast(`You unfollowed @${targetUsername}`);
    } else {
      updatedFollowing = [...following, p];
      triggerToast(`You are now following ${p.name} (@${targetUsername})!`);
    }
    
    setFollowing(updatedFollowing);
    localStorage.setItem('stagecore_following', JSON.stringify(updatedFollowing));
    window.dispatchEvent(new Event('storage'));
  };

  const handleRemoveFollower = (targetUsername) => {
    const updatedFollowers = followers.filter(f => {
      const u = typeof f === 'object' ? f.username : f;
      return u !== targetUsername;
    });
    setFollowers(updatedFollowers);
    localStorage.setItem('stagecore_followers', JSON.stringify(updatedFollowers));
    triggerToast(`Removed @${targetUsername} from your followers list`);
  };

  const achievements = [];

  const featuredPlayers = [];

  const filteredPlayers = featuredPlayers.filter(p => 
    p.ign.toLowerCase().includes(findSearchQuery.toLowerCase()) || 
    p.game.toLowerCase().includes(findSearchQuery.toLowerCase())
  );

  const whoToFollowList = [];

  const handleComposerMediaFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit for client-side uploads. Please choose a smaller file.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedMediaUrl(reader.result);
        setGifUrl('');
      };
      reader.readAsDataURL(file);
    }
  };

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
      avatar: currentAvatar,
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

  const handleDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this social post?")) {
      const updatedPosts = posts.filter(post => post.id !== postId);
      savePosts(updatedPosts);
      triggerToast('Post deleted successfully!');
    }
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

  const [commentInputs, setCommentInputs] = useState({});

  const [activeMenuPostId, setActiveMenuPostId] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [activityPost, setActivityPost] = useState(null);
  const [analyticsPost, setAnalyticsPost] = useState(null);
  const [replyPermissionPost, setReplyPermissionPost] = useState(null);
  const [communityNotePost, setCommunityNotePost] = useState(null);
  const [noteRequestReason, setNoteRequestReason] = useState('');

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

  return (
    <div className="space-y-6 text-left animate-fadeIn relative">
      
      {/* Toast Alert Popups */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-gaming-purple text-white font-extrabold text-[10px] uppercase tracking-wider py-2.5 px-4 rounded-xl border border-gaming-purple/40 shadow-lg shadow-gaming-purple/10 animate-slideRight">
          <Check size={14} />
          {toastMessage}
        </div>
      )}

      {/* Twitter/X Profile Card Container */}
      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden bg-black/40">
        {/* Banner with absolute background */}
        <div className="h-44 w-full relative animate-fadeIn">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bannerBgImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          
          {/* Edit Banner button overlay */}
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="absolute top-4 right-4 z-20 px-3 py-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all rounded-full text-[9px] font-black uppercase text-gray-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
            title="Edit profile cover banner"
          >
            <Camera size={10} />
            Edit Cover
          </button>
        </div>

        {/* Profile Info Details Overlay */}
        <div className="px-6 pb-4 relative -mt-12 flex flex-col z-10 text-left">
          {/* Top Row: Avatar & Edit button */}
          <div className="flex justify-between items-end gap-4">
            {/* Avatar circle overlapping cover photo */}
            <div 
              onClick={() => setIsEditModalOpen(true)}
              className="w-24 h-24 rounded-full bg-gradient-to-tr from-gaming-purple to-gaming-blue border-4 border-black flex items-center justify-center font-black text-white text-4xl shadow-xl relative overflow-hidden group cursor-pointer select-none"
              title="Click to edit profile picture"
            >
              {renderAvatar(currentAvatar)}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Camera size={20} className="text-white" />
              </div>
            </div>
            
            {/* Edit Profile Button */}
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-1.5 rounded-full text-xs font-bold text-white border border-white/30 hover:bg-white/5 transition-all cursor-pointer bg-transparent"
            >
              Edit profile
            </button>
          </div>

          {/* User Details Details */}
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white tracking-wide uppercase flex items-center gap-1.5">
                {currentIgn}
                {isVerified && (
                  <span className="text-[#1D9BF0] text-[15px] select-none" title="Verified Account">
                    <span className="bg-[#1D9BF0] text-white rounded-full w-4 h-4 flex items-center justify-center font-black text-[9px] scale-95 border border-black leading-none">✓</span>
                  </span>
                )}
              </h2>
              
              {/* Interactive Get Verified Toggle Badge */}
              <button
                onClick={handleToggleVerify}
                className="px-2 py-0.5 rounded bg-[#1D9BF0]/15 hover:bg-[#1D9BF0]/25 text-[#1D9BF0] font-black text-[8px] uppercase tracking-wider transition-colors cursor-pointer border-0 inline-flex items-center gap-1"
              >
                {isVerified ? 'Verified ✓' : 'Get verified'}
              </button>
            </div>

            {/* Handle (@username) */}
            <span className="text-[11px] text-gray-500 font-semibold block -mt-1 font-mono">@{storedUser?.username?.toLowerCase() || 'smartanandmohan'}</span>

            {/* Platform joined details & location */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 items-center text-[11px] font-bold text-gray-400 mt-1">
              <span className="flex items-center gap-1">
                <Calendar size={13} className="text-gray-500" />
                Joined June 2024
              </span>
              <span className="flex items-center gap-1">
                <Globe size={13} className="text-gaming-blue" />
                India
              </span>
              <span>
                Active Team: <span className="text-white font-mono">Team Alpha</span>
              </span>
            </div>

            {/* Followers / Following counts */}
            <div className="flex gap-4 items-center text-[11px] text-gray-400 mt-2 font-sans">
              <button 
                onClick={() => setActiveModal('following')} 
                className="hover:underline transition-all cursor-pointer border-0 bg-transparent flex items-center gap-1 p-0 text-gray-400"
              >
                <span className="text-white font-bold">{following.length}</span> Following
              </button>
              <button 
                onClick={() => setActiveModal('followers')} 
                className="hover:underline transition-all cursor-pointer border-0 bg-transparent flex items-center gap-1 p-0 text-gray-400"
              >
                <span className="text-white font-bold">{(1420 + followers.length).toLocaleString()}</span> Followers
              </button>
            </div>
          </div>
        </div>

        {/* Tab Selection Header (Twitter/X style tabs) */}
        <div className="border-t border-white/5 flex text-center text-xs font-black uppercase tracking-wider relative z-10 mt-2">
          {[
            { id: 'posts', name: 'Posts' },
            { id: 'replies', name: 'Replies' },
            { id: 'highlights', name: 'Highlights' },
            { id: 'likes', name: 'Likes' }
          ].map(tab => {
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex-1 py-3 text-center cursor-pointer relative transition-all border-0 bg-transparent ${
                  isActive ? 'text-white' : 'text-gray-500 hover:text-white'
                }`}
              >
                <span>{tab.name}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-[3px] bg-[#1D9BF0] rounded-full animate-fadeIn" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* DYNAMIC TAB VIEWS LAYOUT (2 Column Grid for Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left 2 Columns: Feed Lists */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* TAB 1: POSTS */}
          {activeSubTab === 'posts' && (
            <div className="space-y-6">
              
              {/* Creator Box: Twitter/X Composer Style */}
              <div className="glass-panel border border-white/5 rounded-2xl p-4 bg-[#03050f]/60 space-y-4">
                <div className="flex gap-3 text-left">
                  {/* User Avatar */}
                  <div className="w-9 h-9 rounded-full bg-gaming-purple/15 border border-gaming-purple/35 flex items-center justify-center font-black text-white shrink-0 overflow-hidden select-none">
                    {currentAvatar && (currentAvatar.startsWith('http') || currentAvatar.startsWith('/') || currentAvatar.startsWith('data:')) ? (
                      <img src={currentAvatar} alt={ign} className="w-full h-full object-cover" />
                    ) : (
                      currentAvatar || '🎮'
                    )}
                  </div>

                  {/* Composer inputs */}
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
                          onChange={(e) => setNewPostText(e.target.value)}
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
                            onChange={handleComposerMediaFileChange}
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

              {/* User Published Posts List */}
              {posts.filter(p => p.username === ign).length === 0 ? (
                <div className="glass-panel py-12 text-center rounded-2xl border border-white/5 bg-[#03050f]/30">
                  <span className="text-[20px] mb-2 block">📝</span>
                  <h3 className="text-xs font-bold text-white mb-1">No posts yet</h3>
                  <p className="text-[10px] text-gray-500">Draft a status or share an upload using the composer above!</p>
                </div>
              ) : (
                posts.filter(p => p.username === ign).sort((a, b) => {
                  if (a.isPinned && !b.isPinned) return -1;
                  if (!a.isPinned && b.isPinned) return 1;
                  return 0;
                }).map(post => (
                  <div key={post.id} className="glass-panel border border-white/5 rounded-2xl bg-[#03050f]/30 overflow-hidden shadow-xl hover:border-white/10 transition-colors">
                    <div className="p-4 flex items-center justify-between border-b border-white/5 relative">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gaming-purple/15 border border-gaming-purple/35 flex items-center justify-center font-black text-white shrink-0 overflow-hidden">
                          {renderAvatar(post.avatar || currentAvatar)}
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
                                if (hasVoted) return;
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

                    {post.video && (
                      <div className="w-full overflow-hidden border-y border-white/5 bg-black relative">
                        <video src={post.video} controls className="w-full max-h-[250px] object-contain" muted preload="metadata" />
                      </div>
                    )}

                    {post.image && !post.video && (
                      <div className="w-full max-h-[250px] overflow-hidden border-y border-white/5 bg-black/40">
                        <img src={post.image} alt="Media" className="w-full h-full object-cover max-h-[250px]" />
                      </div>
                    )}

                    <div className="p-4 bg-[#03050f]/60 space-y-4">
                      <div className="flex items-center gap-5">
                        <button 
                          onClick={() => handleLikePost(post.id)}
                          className="flex items-center gap-1.5 text-[9px] uppercase font-black tracking-wider text-gray-400 hover:text-pink-500 cursor-pointer transition-colors border-0 bg-transparent"
                        >
                          <Heart size={13} className={post.isLiked ? "fill-pink-500 text-pink-500" : "text-gray-400"} />
                          <span>{post.likes} Likes</span>
                        </button>
                        
                        <span className="flex items-center gap-1.5 text-[9px] uppercase font-black tracking-wider text-gray-400">
                          <MessageSquare size={13} />
                          <span>{post.comments.length} Comments</span>
                        </span>
                      </div>

                      {post.comments.length > 0 && (
                        <div className="space-y-2 border-t border-white/5 pt-3">
                          {post.comments.map((comm, idx) => (
                            <div key={idx} className="text-[10px] leading-relaxed text-left flex gap-1.5">
                              <span className="font-extrabold text-white uppercase tracking-wider whitespace-nowrap">{comm.username}:</span>
                              <span className="text-gray-400 font-semibold">{comm.text}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <form onSubmit={(e) => handleAddComment(e, post.id)} className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
                        <input
                          type="text"
                          placeholder="Write a social comment..."
                          value={commentInputs[post.id] || ''}
                          onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                          className="flex-1 bg-[#050816] border border-white/10 rounded-xl px-4 py-2 text-[10px] text-white focus:outline-none focus:border-gaming-purple/40 placeholder-gray-600 font-semibold"
                        />
                        <button type="submit" className="p-2 bg-gaming-purple hover:bg-gaming-purple/90 text-white rounded-xl transition-all cursor-pointer border-0">
                          <Send size={10} />
                        </button>
                      </form>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: REPLIES */}
          {activeSubTab === 'replies' && (
            <div className="space-y-4">
              {(() => {
                const userReplies = [];
                posts.forEach(post => {
                  post.comments.forEach(comment => {
                    if (comment.username === ign) {
                      userReplies.push({ post, comment });
                    }
                  });
                });

                if (userReplies.length === 0) {
                  return (
                    <div className="glass-panel py-16 text-center rounded-2xl border border-white/5 bg-[#03050f]/30">
                      <span className="text-[20px] mb-2 block">💬</span>
                      <h3 className="text-xs font-bold text-white mb-1">No replies yet</h3>
                      <p className="text-[10px] text-gray-500 font-medium">Comments you write on community posts will appear here.</p>
                    </div>
                  );
                }

                return userReplies.map((reply, idx) => (
                  <div key={idx} className="glass-panel p-4 rounded-xl border border-white/5 bg-[#03050f]/30 space-y-2 text-left">
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                      <span>You replied to @{reply.post.username}</span>
                      <span>•</span>
                      <span>{reply.post.time}</span>
                    </div>
                    <p className="text-xs text-white font-semibold italic bg-black/20 p-2.5 rounded-lg border border-white/5">
                      "{reply.comment.text}"
                    </p>
                    <div className="text-[10px] text-gray-500 font-semibold truncate">
                      Original Post: <span className="text-gray-400 font-medium">"{reply.post.content || reply.post.type}"</span>
                    </div>
                  </div>
                ));
              })()}
            </div>
          )}

          {/* TAB 3: HIGHLIGHTS */}
          {activeSubTab === 'highlights' && (
            <div className="space-y-6">
              {/* Highlighted Posts Sub-Section */}
              <div className="space-y-4">
                <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest block text-left">Highlighted Posts</span>
                {posts.filter(p => p.username === ign && p.isHighlighted).length === 0 ? (
                  <div className="glass-panel py-8 text-center rounded-2xl border border-white/5 bg-[#03050f]/20">
                    <span className="text-lg mb-1 block">⭐</span>
                    <p className="text-[9px] text-gray-500 font-semibold">No posts highlighted yet. Highlight posts from the post options dropdown menu!</p>
                  </div>
                ) : (
                  posts.filter(p => p.username === ign && p.isHighlighted).map(post => (
                    <div key={post.id} className="glass-panel border border-white/5 rounded-2xl bg-[#03050f]/30 overflow-hidden shadow-xl hover:border-white/10 transition-colors text-left">
                      <div className="p-4 flex items-center justify-between border-b border-white/5 relative">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gaming-purple/15 border border-gaming-purple/35 flex items-center justify-center font-black text-white shrink-0 overflow-hidden">
                            {renderAvatar(post.avatar || currentAvatar)}
                          </div>
                          <div>
                            <span className="text-xs font-extrabold text-white block uppercase tracking-wide">{post.username}</span>
                            <span className="text-[8px] text-gray-500 font-mono block mt-0.5">{post.time}</span>
                          </div>
                        </div>
                        <span className="text-[8px] bg-amber-500/20 text-amber-400 border border-amber-500/35 px-1.5 py-0.5 rounded uppercase font-black tracking-wider flex items-center gap-1">
                          ⭐ Highlight
                        </span>
                      </div>
                      
                      {post.content && (
                        <div className="p-4 text-xs font-semibold leading-relaxed text-gray-300">
                          {post.content}
                        </div>
                      )}
                      
                      {post.image && (
                        <div className="w-full max-h-[200px] overflow-hidden border-y border-white/5 bg-black/40">
                          <img src={post.image} alt="Highlight" className="w-full h-full object-cover max-h-[200px]" />
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Achievements Sub-Section */}
              <div className="space-y-4 pt-2">
                <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest block text-left">Platform Achievements</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {achievements.map((ach, idx) => (
                    <div key={idx} className="glass-panel p-4 rounded-xl border border-white/5 flex gap-3.5 bg-[#03050f]/30 text-left">
                      <div className="w-11 h-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center font-black text-lg shadow shrink-0 select-none">
                        {ach.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-extrabold text-xs text-white uppercase tracking-wide">{ach.name}</h4>
                          <span className={`text-[8px] px-1.5 py-0.5 rounded font-black uppercase ${
                            ach.tier === 'Gold' ? 'text-amber-400 bg-amber-500/10' : ach.tier === 'Silver' ? 'text-gray-300 bg-white/10' : 'text-orange-400 bg-orange-500/10'
                          }`}>{ach.tier}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 font-medium leading-normal mt-1">{ach.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LIKES */}
          {activeSubTab === 'likes' && (
            <div className="space-y-6">
              {posts.filter(p => p.isLiked && !mutedUsers.includes(p.username) && !blockedUsers.includes(p.username)).length === 0 ? (
                <div className="glass-panel py-16 text-center rounded-2xl border border-white/5 bg-[#03050f]/30">
                  <span className="text-[20px] mb-2 block">❤️</span>
                  <h3 className="text-xs font-bold text-white mb-1">No liked posts</h3>
                  <p className="text-[10px] text-gray-500">Posts you hit the like button on will appear here.</p>
                </div>
              ) : (
                posts.filter(p => p.isLiked && !mutedUsers.includes(p.username) && !blockedUsers.includes(p.username)).map(post => (
                  <div key={post.id} className="glass-panel border border-white/5 rounded-2xl bg-[#03050f]/30 overflow-hidden shadow-xl hover:border-white/10 transition-colors">
                    <div className="p-4 flex items-center justify-between border-b border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gaming-purple/15 border border-gaming-purple/35 flex items-center justify-center font-black text-white shrink-0 overflow-hidden">
                          {post.avatar && (post.avatar.startsWith('http') || post.avatar.startsWith('/') || post.avatar.startsWith('data:')) ? (
                            <img src={post.avatar} alt={post.username} className="w-full h-full object-cover" />
                          ) : (
                            post.avatar || '🎮'
                          )}
                        </div>
                        <div>
                          <span className="text-xs font-extrabold text-white block uppercase tracking-wide">{post.username}</span>
                          <span className="text-[8px] text-gray-500 font-mono block mt-0.5">{post.time}</span>
                        </div>
                      </div>
                    </div>

                    {post.content && (
                      <div className="p-4 text-xs font-semibold leading-relaxed text-gray-300 text-left">
                        {post.content}
                      </div>
                    )}

                    {post.video && (
                      <div className="w-full overflow-hidden border-y border-white/5 bg-black relative">
                        <video src={post.video} controls className="w-full max-h-[250px] object-contain" muted preload="metadata" />
                      </div>
                    )}

                    {post.image && !post.video && (
                      <div className="w-full max-h-[250px] overflow-hidden border-y border-white/5 bg-black/40">
                        <img src={post.image} alt="Media" className="w-full h-full object-cover max-h-[250px]" />
                      </div>
                    )}

                    <div className="p-4 bg-[#03050f]/60 space-y-4">
                      <div className="flex items-center gap-5">
                        <button 
                          onClick={() => handleLikePost(post.id)}
                          className="flex items-center gap-1.5 text-[9px] uppercase font-black tracking-wider text-gray-400 hover:text-pink-500 cursor-pointer transition-colors border-0 bg-transparent"
                        >
                          <Heart size={13} className={post.isLiked ? "fill-pink-500 text-pink-500" : "text-gray-400"} />
                          <span>{post.likes} Likes</span>
                        </button>
                        
                        <span className="flex items-center gap-1.5 text-[9px] uppercase font-black tracking-wider text-gray-400">
                          <MessageSquare size={13} />
                          <span>{post.comments.length} Comments</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

        {/* Right 1 Column: Widgets (Who to follow & Social Links) */}
        <div className="space-y-6">
          
          {/* Who to Follow Widget */}
          <div className="glass-panel border border-white/5 rounded-2xl p-4 bg-[#03050f]/60 space-y-4 text-left">
            <h3 className="text-xs font-black text-white uppercase tracking-wider border-b border-white/5 pb-2">
              Who to follow
            </h3>
            
            <div className="space-y-4">
              {whoToFollowList.map(player => {
                const isFollowed = following.includes(player.handle);
                return (
                  <div key={player.handle} className="flex gap-3 justify-between items-start text-xs border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-black text-white text-md shrink-0 select-none">
                      {player.avatar}
                    </div>
                    
                    <div className="flex-1 space-y-0.5 text-left">
                      <div className="flex items-center gap-1">
                        <span className="font-extrabold text-white text-[10px] hover:underline cursor-pointer">{player.name}</span>
                        {player.isVerified && (
                          <span className="text-[#1D9BF0] text-[9px] select-none" title="Verified Account">
                            <span className="bg-[#1D9BF0] text-white rounded-full w-3 h-3 flex items-center justify-center font-extrabold text-[7px] border border-black leading-none">✓</span>
                          </span>
                        )}
                      </div>
                      <span className="text-[8px] text-gray-500 font-semibold block -mt-1 font-mono">@{player.handle}</span>
                      <p className="text-[9px] text-gray-400 font-medium leading-normal mt-1">{player.bio}</p>
                    </div>

                    <button
                      onClick={() => handleToggleFollow(player.handle)}
                      className={`py-1 px-3 rounded-full text-[8px] font-black uppercase tracking-wider transition-all cursor-pointer border-0 shrink-0 ${
                        isFollowed
                          ? 'bg-[#1D9BF0]/15 text-[#1D9BF0] hover:bg-[#1D9BF0]/20'
                          : 'bg-white text-black hover:bg-white/95'
                      }`}
                    >
                      {isFollowed ? 'Following' : 'Follow'}
                    </button>
                  </div>
                );
              })}
            </div>
            <button 
              onClick={() => triggerToast('Loading more verified suggestions...')}
              className="text-[10px] text-[#1D9BF0] hover:underline font-bold mt-3 cursor-pointer border-0 bg-transparent block p-0 text-left"
            >
              Show more
            </button>
          </div>
        </div>
      </div>
      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel w-full max-w-lg bg-[#090d22]/95 border border-white/10 rounded-2xl p-6 relative shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar text-xs">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Settings size={16} className="text-gaming-purple" />
                Edit Profile Customization
              </h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-5 text-left">
              {/* Username Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">In-Game Name / Username</label>
                <input
                  type="text"
                  required
                  placeholder="In-Game Name..."
                  value={editIgn}
                  onChange={(e) => setEditIgn(e.target.value)}
                  className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-gaming-purple/40 placeholder-gray-600 font-semibold"
                />
              </div>

              {/* Profile Picture (Avatar) */}
              <div className="space-y-2.5">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Profile Picture (Avatar)</label>
                <div className="flex gap-4 mb-2">
                  <button
                    type="button"
                    onClick={() => setEditAvatarType('emoji')}
                    className={`flex-1 py-2 rounded-xl border font-bold text-center transition-all cursor-pointer ${
                      editAvatarType === 'emoji'
                        ? 'bg-gaming-purple/20 border-gaming-purple text-white shadow-md'
                        : 'bg-white/3 border-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    Select Preset Emoji
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditAvatarType('url')}
                    className={`flex-1 py-2 rounded-xl border font-bold text-center transition-all cursor-pointer ${
                      editAvatarType === 'url'
                        ? 'bg-gaming-purple/20 border-gaming-purple text-white shadow-md'
                        : 'bg-white/3 border-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    Custom URL / Upload Image
                  </button>
                </div>

                {editAvatarType === 'emoji' ? (
                  <div className="grid grid-cols-7 gap-2 p-2 bg-[#050816] border border-white/5 rounded-xl">
                    {['🎮', '⚡', '👑', '👾', '🕵️', '🦸', '👽', '🔥', '🎯', '🛡️', '🤖', '👻', '🚀', '🧠', '🦁', '💀', '💎', '🎨', '✪'].map(emoji => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setEditAvatarEmoji(emoji)}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center font-black text-xl transition-all cursor-pointer ${
                          editAvatarEmoji === emoji
                            ? 'bg-gaming-purple border border-gaming-purple'
                            : 'hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3 p-3 bg-[#050816] border border-white/5 rounded-xl">
                    <div className="space-y-1.5">
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Image URL Link</span>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/... or similar"
                        value={editAvatarUrl.startsWith('data:') ? '' : editAvatarUrl}
                        onChange={(e) => setEditAvatarUrl(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-gaming-purple/40 placeholder-gray-600 font-semibold"
                      />
                    </div>
                    
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full border-t border-white/5" />
                      </div>
                      <span className="relative px-2 bg-[#050816] text-[8px] font-black text-gray-500 uppercase tracking-widest block mx-auto w-fit">OR</span>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Upload Local Image</span>
                      <label className="flex items-center justify-center gap-2 w-full bg-white/3 border border-dashed border-white/10 hover:bg-white/5 hover:border-white/20 transition-all rounded-xl py-3 cursor-pointer text-gray-400 hover:text-white font-bold">
                        <Camera size={14} />
                        <span>Choose profile image file</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Banner */}
              <div className="space-y-2.5">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Profile Banner Background</label>
                <div className="flex gap-4 mb-2">
                  <button
                    type="button"
                    onClick={() => setEditBannerType('preset')}
                    className={`flex-1 py-2 rounded-xl border font-bold text-center transition-all cursor-pointer ${
                      editBannerType === 'preset'
                        ? 'bg-gaming-purple/20 border-gaming-purple text-white shadow-md'
                        : 'bg-white/3 border-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    Select Color Preset
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditBannerType('url')}
                    className={`flex-1 py-2 rounded-xl border font-bold text-center transition-all cursor-pointer ${
                      editBannerType === 'url'
                        ? 'bg-gaming-purple/20 border-gaming-purple text-white shadow-md'
                        : 'bg-white/3 border-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    Custom URL / Upload Image
                  </button>
                </div>

                {editBannerType === 'preset' ? (
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'cyberpunk', name: 'Cyberpunk Violet', style: 'bg-gradient-to-r from-[#7C3AED] to-[#FF007F]' },
                      { id: 'frostbite', name: 'Frostbite Aqua', style: 'bg-gradient-to-r from-[#00F0FF] to-[#3B82F6]' },
                      { id: 'toxic', name: 'Toxic Emerald', style: 'bg-gradient-to-r from-[#10B981] to-[#059669]' },
                      { id: 'abyss', name: 'Abyss Scarlet', style: 'bg-gradient-to-r from-[#EF4444] to-[#7C3AED]' }
                    ].map(preset => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setEditBannerPreset(preset.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer text-left ${
                          editBannerPreset === preset.id
                            ? 'border-gaming-purple bg-gaming-purple/10'
                            : 'border-white/5 bg-white/2 hover:bg-white/5'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg shrink-0 ${preset.style}`} />
                        <span className="font-extrabold text-[10px] uppercase text-white">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3 p-3 bg-[#050816] border border-white/5 rounded-xl">
                    <div className="space-y-1.5">
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Banner Image URL Link</span>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/... or similar"
                        value={editBannerUrl.startsWith('data:') ? '' : editBannerUrl}
                        onChange={(e) => setEditBannerUrl(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-gaming-purple/40 placeholder-gray-600 font-semibold"
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center center justify-center">
                        <div className="w-full border-t border-white/5" />
                      </div>
                      <span className="relative px-2 bg-[#050816] text-[8px] font-black text-gray-500 uppercase tracking-widest block mx-auto w-fit">OR</span>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Upload Local Banner</span>
                      <label className="flex items-center justify-center gap-2 w-full bg-white/3 border border-dashed border-white/10 hover:bg-white/5 hover:border-white/20 transition-all rounded-xl py-3 cursor-pointer text-gray-400 hover:text-white font-bold">
                        <Camera size={14} />
                        <span>Choose banner image file</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBannerFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-3 bg-white/3 border border-white/5 hover:bg-white/5 hover:border-white/10 text-white font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gaming-purple hover:bg-gaming-purple/90 text-white font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md shadow-gaming-purple/20 text-center"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Followers / Following Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel w-full max-w-md bg-[#090d22]/95 border border-white/10 rounded-2xl p-6 relative shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                {activeModal === 'followers' ? 'Followers List' : 'Following List'}
              </h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-1 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="max-h-80 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
              {activeModal === 'followers' && (
                followers.length === 0 ? (
                  <p className="text-xs text-gray-500 text-center py-6">No followers yet.</p>
                ) : (
                  followers.map(item => {
                    const p = getPlayerDetails(item);
                    const isFollowed = following.some(f => (typeof f === 'object' ? f.username : f) === p.username);
                    return (
                      <div key={p.username} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/2 border border-white/5 hover:border-gaming-purple/20 transition-all">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center font-black text-white text-xl shrink-0 overflow-hidden">
                            {p.avatar && (p.avatar.startsWith('http') || p.avatar.startsWith('/') || p.avatar.startsWith('data:')) ? (
                              <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
                            ) : (
                              p.avatar || '🎮'
                            )}
                          </div>
                          <div className="text-left space-y-0.5 min-w-0">
                            <span className="font-extrabold text-xs text-white block truncate">{p.name}</span>
                            <span className="text-[9px] text-gray-400 font-mono block truncate">@{p.username} • <span className="text-gray-500 font-sans">{p.role}</span></span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => handleToggleFollow(p)}
                            className={`px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer border flex items-center gap-1 ${
                              isFollowed
                                ? 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20'
                                : 'bg-gaming-purple/20 border-gaming-purple/35 text-[#d0b4ff] hover:bg-gaming-purple/30'
                            }`}
                          >
                            {isFollowed ? (
                              <>
                                <UserCheck size={11} /> Unfollow
                              </>
                            ) : (
                              <>
                                <UserPlus size={11} /> Follow Back
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => handleRemoveFollower(p.username)}
                            className="px-2 py-1.5 rounded-lg text-[9px] font-bold bg-white/5 border border-white/10 text-gray-400 hover:bg-red-500/15 hover:border-red-500/30 hover:text-red-400 transition-all cursor-pointer flex items-center gap-1"
                            title={`Remove ${p.name} (@${p.username}) from your followers`}
                          >
                            <UserX size={11} /> Remove
                          </button>
                        </div>
                      </div>
                    );
                  })
                )
              )}

              {activeModal === 'following' && (
                following.length === 0 ? (
                  <p className="text-xs text-gray-500 text-center py-6">You are not following anyone yet.</p>
                ) : (
                  following.map(item => {
                    const p = getPlayerDetails(item);
                    return (
                      <div key={p.username} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/2 border border-white/5 hover:border-gaming-purple/20 transition-all">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center font-black text-white text-xl shrink-0 overflow-hidden">
                            {p.avatar && (p.avatar.startsWith('http') || p.avatar.startsWith('/') || p.avatar.startsWith('data:')) ? (
                              <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
                            ) : (
                              p.avatar || '🎮'
                            )}
                          </div>
                          <div className="text-left space-y-0.5 min-w-0">
                            <span className="font-extrabold text-xs text-white block truncate">{p.name}</span>
                            <span className="text-[9px] text-gray-400 font-mono block truncate">@{p.username} • <span className="text-gray-500 font-sans">{p.role}</span></span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleToggleFollow(p)}
                          className="px-3 py-1.5 rounded-lg text-[9px] font-black bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 shrink-0"
                        >
                          <UserCheck size={11} /> Unfollow
                        </button>
                      </div>
                    );
                  })
                )
              )}
            </div>
          </div>
        </div>
      )}

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
