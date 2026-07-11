export interface YouTubeVideo {
  id: string;
  title: string;
  channelName: string;
  thumbnail: string;
  duration: string;
  subject: string;
  country: string;
  degreeLevel: string;
}

export function fetchYouTubeVideos(query?: string): YouTubeVideo[] {
  // In a real app, this would call the YouTube Data API v3
  // Returning sample data mapped to the query
  const sampleVideos: YouTubeVideo[] = [
    {
      id: 'yt1',
      title: 'Harvard CS50 - Lecture 1 - C',
      channelName: 'CS50',
      thumbnail: 'https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=800&q=80',
      duration: '2:15:30',
      subject: 'Computer Science',
      country: 'USA',
      degreeLevel: 'Undergraduate'
    },
    {
      id: 'yt2',
      title: 'Introduction to Anatomy & Physiology',
      channelName: 'CrashCourse',
      thumbnail: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=800&q=80',
      duration: '11:20',
      subject: 'Medicine',
      country: 'USA',
      degreeLevel: 'Undergraduate'
    },
    {
      id: 'yt3',
      title: 'Macroeconomics- Everything You Need to Know',
      channelName: 'Jacob Clifford',
      thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
      duration: '29:58',
      subject: 'Business',
      country: 'UK',
      degreeLevel: 'Undergraduate'
    },
    {
      id: 'yt4',
      title: 'Understanding Contract Law',
      channelName: 'LawShelf',
      thumbnail: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
      duration: '15:45',
      subject: 'Law',
      country: 'UK',
      degreeLevel: 'Postgraduate'
    },
    {
      id: 'yt5',
      title: 'Machine Learning Basics',
      channelName: 'Simplilearn',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
      duration: '45:10',
      subject: 'Computer Science',
      country: 'India',
      degreeLevel: 'Undergraduate'
    }
  ];
  
  if (query) {
    return sampleVideos.filter(v => 
      v.title.toLowerCase().includes(query.toLowerCase()) || 
      v.subject.toLowerCase().includes(query.toLowerCase())
    );
  }
  return sampleVideos;
}
