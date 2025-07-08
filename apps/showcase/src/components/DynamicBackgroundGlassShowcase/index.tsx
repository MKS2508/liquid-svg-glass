/**
 * @file DynamicBackgroundGlassShowcase - Rich content showcase for glass effects
 * @author MKS
 */
import React from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, DollarSign, TrendingUp, 
  Star, Heart, MessageCircle, Share2, Eye,
  Code, Database, Server, Shield, Award
} from 'lucide-react';
import styles from './DynamicBackgroundGlassShowcase.module.scss';

// UI Element style presets
type UIElementStyle = 'glass' | 'solid' | 'outline' | 'minimal';

// Rich background presets with themed content and animations
const backgroundPresets = [
  {
    name: 'cyberpunk',
    gradient: 'cyberpunk-gradient',
    staticGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    theme: 'tech',
    content: 'dashboard',
    isDark: true,
    particles: 'tech',
    uiStyle: 'glass' as UIElementStyle
  },
  {
    name: 'sunset',
    gradient: 'sunset-gradient', 
    staticGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #ff9068 100%)',
    theme: 'social',
    content: 'social',
    isDark: true,
    particles: 'hearts',
    uiStyle: 'glass' as UIElementStyle
  },
  {
    name: 'ocean',
    gradient: 'ocean-gradient',
    staticGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #43e97b 100%)',
    theme: 'business',
    content: 'ecommerce',
    isDark: false,
    particles: 'bubbles',
    uiStyle: 'solid' as UIElementStyle
  },
  {
    name: 'forest',
    gradient: 'forest-gradient',
    staticGradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 50%, #667eea 100%)',
    theme: 'nature',
    content: 'portfolio',
    isDark: false,
    particles: 'leaves',
    uiStyle: 'outline' as UIElementStyle
  },
  {
    name: 'cosmic',
    gradient: 'cosmic-gradient',
    staticGradient: 'radial-gradient(ellipse at center, #d299c2 0%, #fef9d7 50%, #a8edea 100%)',
    theme: 'creative',
    content: 'blog',
    isDark: false,
    particles: 'stars',
    uiStyle: 'solid' as UIElementStyle
  },
  {
    name: 'fire',
    gradient: 'fire-gradient',
    staticGradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #ffecd2 100%)',
    theme: 'energy',
    content: 'dashboard',
    isDark: false,
    particles: 'sparks',
    uiStyle: 'glass' as UIElementStyle
  },
  {
    name: 'dark',
    gradient: 'dark-gradient',
    staticGradient: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #2d2d2d 100%)',
    theme: 'minimal',
    content: 'code',
    isDark: true,
    particles: 'code',
    uiStyle: 'minimal' as UIElementStyle
  },
  {
    name: 'light',
    gradient: 'light-gradient',
    staticGradient: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #e9ecef 100%)',
    theme: 'clean',
    content: 'docs',
    isDark: false,
    particles: 'docs',
    uiStyle: 'outline' as UIElementStyle
  }
];

// Utility function to get UI element class based on style preset
const getUIElementClass = (baseClass: string, uiStyle: UIElementStyle) => {
  return `${styles[baseClass]} ${styles[`${baseClass}-${uiStyle}`]}`;
};

// Auxiliary Components
const ProfileCard: React.FC<{ 
  name: string; 
  role: string; 
  avatar: string; 
  uiStyle: UIElementStyle;
}> = ({ name, role, avatar, uiStyle }) => (
  <div className={getUIElementClass('profileCard', uiStyle)}>
    <div className={styles.profileHeader}>
      <div className={getUIElementClass('avatar', uiStyle)}>
        {avatar}
      </div>
      <div className={styles.profileInfo}>
        <h3>{name}</h3>
        <p>{role}</p>
      </div>
    </div>
    <div className={styles.contactIcons}>
      <Mail size={12} />
      <Phone size={12} />
      <MapPin size={12} />
    </div>
  </div>
);

const ProductCard: React.FC<{ 
  name: string; 
  price: string; 
  rating: number; 
  image: string; 
  colors: string;
  uiStyle: UIElementStyle;
}> = ({ name, price, rating, image, colors, uiStyle }) => (
  <div className={getUIElementClass('productCard', uiStyle)}>
    <div 
      className={styles.productImage}
      style={{ 
        background: `linear-gradient(135deg, ${colors.split(' ')[1]}, ${colors.split(' ')[3]})`
      }}
    >
      <div className={styles.imageOverlay}></div>
      <div className={styles.emoji}>{image}</div>
      <div className={styles.highlight}></div>
    </div>
    <h3 className={styles.productName}>{name}</h3>
    <div className={styles.productFooter}>
      <span className={styles.price}>{price}</span>
      <div className={styles.rating}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className={`${styles.star} ${i < rating ? styles.filled : styles.empty}`} />
        ))}
      </div>
    </div>
  </div>
);

const DashboardWidget: React.FC<{ 
  title: string; 
  value: string; 
  trend: string; 
  icon: React.ReactNode; 
  color: string;
  uiStyle: UIElementStyle;
}> = ({ title, value, trend, icon, color, uiStyle }) => {
  const colorMap: Record<string, { from: string; to: string }> = {
    'from-emerald-500 to-green-600': { from: '#10b981', to: '#059669' },
    'from-blue-500 to-cyan-600': { from: '#3b82f6', to: '#0891b2' },
    'from-purple-500 to-violet-600': { from: '#8b5cf6', to: '#7c3aed' },
    'from-orange-500 to-red-600': { from: '#f97316', to: '#dc2626' }
  };

  const colors = colorMap[color] || { from: '#8b5cf6', to: '#7c3aed' };

  return (
    <div 
      className={getUIElementClass('dashboardWidget', uiStyle)}
      style={{
        '--color-from': colors.from,
        '--color-to': colors.to
      } as React.CSSProperties}
    >
      <div className={styles.topBar}></div>
      <div className={styles.widgetHeader}>
        <span className={styles.widgetTitle}>{title}</span>
        <div className={styles.widgetIcon}>{icon}</div>
      </div>
      <div className={styles.widgetValue}>{value}</div>
      <div className={styles.widgetTrend}>
        <TrendingUp className={styles.trendIcon} />
        <span className={styles.trendValue}>{trend}</span>
      </div>
      <div className={styles.backgroundBlur}></div>
    </div>
  );
};

const SocialPost: React.FC<{ 
  author: string; 
  content: string; 
  likes: number; 
  comments: number;
  uiStyle: UIElementStyle;
}> = ({ author, content, likes, comments, uiStyle }) => (
  <div className={`${getUIElementClass('socialPost', uiStyle)} ${styles.spaceY2}`}>
    <div className={`${styles.flexGap2} ${styles.spaceY3}`}>
      <div className={getUIElementClass('avatar', uiStyle)} style={{ width: '32px', height: '32px', fontSize: '14px' }}>
        {author[0]}
      </div>
      <span className={`${styles.textWhite} ${styles.fontSemibold} ${styles.textSm}`}>{author}</span>
      <span className={`${styles.textWhite50} ${styles.textXs}`} style={{ marginLeft: 'auto' }}>2h</span>
    </div>
    <p className={`${styles.textWhite70} ${styles.textSm}`} style={{ lineHeight: '1.5', marginBottom: '12px' }}>{content}</p>
    <div className={`${styles.flexGap4} ${styles.textWhite50}`}>
      <div className={`${styles.flexGap2} ${styles.textXs}`}>
        <Heart size={16} />
        {likes}
      </div>
      <div className={`${styles.flexGap2} ${styles.textXs}`}>
        <MessageCircle size={16} />
        {comments}
      </div>
      <Share2 size={16} style={{ marginLeft: 'auto' }} />
    </div>
  </div>
);

const CodeBlock: React.FC<{ 
  language: string; 
  code: string; 
  uiStyle: UIElementStyle;
}> = ({ language, code, uiStyle }) => (
  <div className={getUIElementClass('codeBlock', uiStyle)}>
    <div style={{ 
      background: 'rgba(255, 255, 255, 0.1)', 
      padding: '8px 12px', 
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      <Code size={16} style={{ color: 'rgba(255, 255, 255, 0.7)' }} />
      <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', fontFamily: 'monospace' }}>{language}</span>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></div>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></div>
      </div>
    </div>
    <div style={{ 
      padding: '12px', 
      fontFamily: 'monospace', 
      fontSize: '12px', 
      color: 'rgba(255, 255, 255, 0.9)', 
      lineHeight: '1.5' 
    }}>
      {code.split('\n').map((line, i) => (
        <div key={i} style={{ display: 'flex' }}>
          <span style={{ color: 'rgba(255, 255, 255, 0.4)', width: '24px', textAlign: 'right', marginRight: '12px' }}>{i + 1}</span>
          <span>{line}</span>
        </div>
      ))}
    </div>
  </div>
);

const DataTable: React.FC<{ uiStyle: UIElementStyle }> = ({ uiStyle }) => (
  <div className={getUIElementClass('dataTable', uiStyle)}>
    <div className={styles.tableHeader}>
      <h3>Analytics Overview</h3>
    </div>
    <div className={styles.tableBody}>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {[
            { metric: 'Page Views', value: '12.5K', change: '+12%' },
            { metric: 'Users', value: '3.2K', change: '+8%' },
            { metric: 'Sessions', value: '8.1K', change: '+15%' },
            { metric: 'Bounce Rate', value: '32%', change: '-5%' }
          ].map((row, i) => (
            <tr key={i}>
              <td>{row.metric}</td>
              <td className={styles.value}>{row.value}</td>
              <td className={styles.change}>{row.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ProgressChart: React.FC<{ 
  title: string; 
  data: { label: string; value: number; color: string }[];
  uiStyle: UIElementStyle;
}> = ({ title, data, uiStyle }) => (
  <div className={getUIElementClass('progressChart', uiStyle)}>
    {title && <h3 className={styles.chartTitle}>{title}</h3>}
    <div className={styles.progressItems}>
      {data.map((item, i) => (
        <div key={i} className={styles.progressItem}>
          <div className={styles.progressHeader}>
            <span>{item.label}</span>
            <span>{item.value}%</span>
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ 
                width: `${item.value}%`, 
                background: item.color 
              }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Content generators for different themes
const renderDashboardContent = (uiStyle: UIElementStyle) => (
  <div className={styles.backgroundContent}>
    <div className={`${styles.grid} ${styles.cols4} ${styles.mb6}`}>
      <DashboardWidget title="Revenue" value="$84.2K" trend="+12.5%" icon={<DollarSign size={20} />} color="from-emerald-500 to-green-600" uiStyle={uiStyle} />
      <DashboardWidget title="Users" value="2.8K" trend="+8.2%" icon={<User size={20} />} color="from-blue-500 to-cyan-600" uiStyle={uiStyle} />
      <DashboardWidget title="Sessions" value="15.4K" trend="+18.9%" icon={<Eye size={20} />} color="from-purple-500 to-violet-600" uiStyle={uiStyle} />
      <DashboardWidget title="Uptime" value="99.9%" trend="+0.1%" icon={<Server size={20} />} color="from-orange-500 to-red-600" uiStyle={uiStyle} />
    </div>
    <div className={`${styles.grid} ${styles.cols2}`}>
      <DataTable uiStyle={uiStyle} />
      <ProgressChart 
        title="Performance Metrics" 
        data={[
          { label: 'API Response', value: 95, color: 'linear-gradient(90deg, #10b981, #34d399)' },
          { label: 'Database', value: 87, color: 'linear-gradient(90deg, #3b82f6, #60a5fa)' },
          { label: 'CDN', value: 92, color: 'linear-gradient(90deg, #8b5cf6, #a78bfa)' },
          { label: 'Cache Hit', value: 78, color: 'linear-gradient(90deg, #f59e0b, #fbbf24)' }
        ]}
        uiStyle={uiStyle}
      />
    </div>
  </div>
);

const renderSocialContent = (uiStyle: UIElementStyle) => (
  <div className={styles.backgroundContent}>
    <div className={`${styles.grid} ${styles.cols2}`}>
      <div className={styles.spaceY4}>
        <SocialPost 
          author="Sarah Chen" 
          content="Just launched my new portfolio website! 🚀 Really excited to share my latest projects with the world." 
          likes={42} 
          comments={8}
          uiStyle={uiStyle}
        />
        <SocialPost 
          author="Mike Rodriguez" 
          content="Working on some amazing React animations today. The glass morphism trend is incredible!" 
          likes={38} 
          comments={12}
          uiStyle={uiStyle}
        />
      </div>
      <div className={styles.spaceY4}>
        <ProfileCard name="Alex Thompson" role="UI/UX Designer" avatar="AT" uiStyle={uiStyle} />
        <ProfileCard name="Emma Wilson" role="Frontend Dev" avatar="EW" uiStyle={uiStyle} />
        <div className={getUIElementClass('profileCard', uiStyle)}>
          <h3 className={`${styles.textWhite} ${styles.fontSemibold} ${styles.textSm}`} style={{ marginBottom: '12px' }}>Trending Topics</h3>
          <div className={styles.spaceY2}>
            {['#WebDesign', '#React', '#Glassmorphism', '#UI', '#Animation'].map((tag, i) => (
              <span key={i} style={{
                display: 'inline-block',
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontSize: '12px',
                padding: '4px 8px',
                borderRadius: '20px',
                marginRight: '8px'
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const renderEcommerceContent = (uiStyle: UIElementStyle) => (
  <div className={styles.backgroundContent}>
    <div className={`${styles.grid} ${styles.cols4} ${styles.mb6}`}>
      <ProductCard name="Wireless Headphones" price="$299" rating={5} image="🎧" colors="from #8b5cf6 to #a855f7" uiStyle={uiStyle} />
      <ProductCard name="Smart Watch" price="$399" rating={4} image="⌚" colors="from #3b82f6 to #06b6d4" uiStyle={uiStyle} />
      <ProductCard name="Phone Case" price="$49" rating={5} image="📱" colors="from #10b981 to #14b8a6" uiStyle={uiStyle} />
      <ProductCard name="Laptop Stand" price="$89" rating={4} image="💻" colors="from #f97316 to #dc2626" uiStyle={uiStyle} />
    </div>
    <div className={`${styles.grid} ${styles.cols3}`}>
      <div className={getUIElementClass('dataTable', uiStyle)} style={{ maxWidth: 'none' }}>
        <div className={styles.tableHeader}>
          <h3>Categories</h3>
        </div>
        <div style={{ padding: '16px' }}>
          <div className={styles.spaceY2}>
            {[
              { name: 'Electronics', count: 31 },
              { name: 'Accessories', count: 23 },
              { name: 'Home & Garden', count: 58 },
              { name: 'Sports', count: 17 },
              { name: 'Books', count: 42 }
            ].map((cat, i) => (
              <div key={i} className={`${styles.flexBetween} ${styles.textSm}`}>
                <span className={styles.textWhite70}>{cat.name}</span>
                <span className={styles.textWhite50}>{cat.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={getUIElementClass('dataTable', uiStyle)} style={{ maxWidth: 'none' }}>
        <div className={styles.tableHeader}>
          <h3>Recent Orders</h3>
        </div>
        <div style={{ padding: '16px' }}>
          <div className={styles.spaceY3}>
            {['Order #1234', 'Order #1235', 'Order #1236'].map((order, i) => (
              <div key={i} className={styles.flexBetween}>
                <span className={`${styles.textWhite} ${styles.textSm}`}>{order}</span>
                <span style={{
                  color: '#22c55e',
                  fontSize: '12px',
                  background: 'rgba(34, 197, 94, 0.2)',
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}>
                  Shipped
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <DashboardWidget title="Sales" value="$12.4K" trend="+22%" icon={<TrendingUp size={20} />} color="from-emerald-500 to-green-600" uiStyle={uiStyle} />
    </div>
  </div>
);

const renderCodeContent = (uiStyle: UIElementStyle) => (
  <div className={styles.backgroundContent}>
    <div className={`${styles.grid} ${styles.cols2}`}>
      <CodeBlock 
        language="react.tsx" 
        code={`function GlassEffect() {\n  const [position, setPosition] = useState({\n    x: 0, y: 0\n  });\n\n  return (\n    <div className="glass-effect">\n      {children}\n    </div>\n  );\n}`}
        uiStyle={uiStyle}
      />
      <div className={styles.spaceY4}>
        <div className={styles.dataTable} style={{ maxWidth: 'none' }}>
          <div className={styles.tableHeader} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Database size={20} style={{ color: '#60a5fa' }} />
            <h3>API Status</h3>
          </div>
          <div style={{ padding: '16px' }}>
            <div className={styles.spaceY2}>
              {[
                { endpoint: '/api/users', status: 'online', ms: '45ms' },
                { endpoint: '/api/orders', status: 'online', ms: '32ms' },
                { endpoint: '/api/products', status: 'degraded', ms: '156ms' }
              ].map((api, i) => (
                <div key={i} className={`${styles.flexBetween} ${styles.textSm}`}>
                  <span className={`${styles.textWhite70} ${styles.fontBold}`} style={{ fontFamily: 'monospace' }}>{api.endpoint}</span>
                  <div className={styles.flexGap2}>
                    <span className={`${styles.textWhite50} ${styles.textXs}`}>{api.ms}</span>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: api.status === 'online' ? '#22c55e' : '#f59e0b'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.dataTable} style={{ maxWidth: 'none' }}>
          <div className={styles.tableHeader} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={20} style={{ color: '#22c55e' }} />
            <h3>Security</h3>
          </div>
          <div style={{ padding: '16px' }}>
            <div className={`${styles.spaceY2} ${styles.textSm} ${styles.textWhite70}`}>
              <div className={styles.flexBetween}>
                <span>SSL Certificate</span>
                <span style={{ color: '#22c55e' }}>Valid</span>
              </div>
              <div className={styles.flexBetween}>
                <span>Firewall</span>
                <span style={{ color: '#22c55e' }}>Active</span>
              </div>
              <div className={styles.flexBetween}>
                <span>Last Scan</span>
                <span className={styles.textWhite50}>2h ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const renderBlogContent = (uiStyle: UIElementStyle) => (
  <div className={styles.backgroundContent}>
    <div className={`${styles.grid} ${styles.cols3}`}>
      <div style={{ gridColumn: 'span 2' }}>
        <div className={styles.spaceY4}>
          <div className={getUIElementClass('dataTable', uiStyle)} style={{ maxWidth: 'none', padding: '24px' }}>
            <div className={`${styles.flexGap2} ${styles.spaceY4}`} style={{ marginBottom: '16px' }}>
              <Calendar size={16} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
              <span className={`${styles.textWhite50} ${styles.textSm}`}>January 15, 2024</span>
            </div>
            <h2 className={`${styles.textWhite} ${styles.fontBold}`} style={{ fontSize: '20px', marginBottom: '12px' }}>
              The Future of Glass Morphism in Web Design
            </h2>
            <p className={`${styles.textWhite70} ${styles.textSm}`} style={{ lineHeight: '1.5', marginBottom: '16px' }}>
              Glass morphism has revolutionized modern web design with its translucent, 
              blurred background effects that create depth and visual hierarchy. This 
              design trend combines transparency with subtle shadows and borders...
            </p>
            <div className={`${styles.flexGap4} ${styles.textWhite50} ${styles.textSm}`}>
              <div className={styles.flexGap2}>
                <Eye size={16} />
                <span>1.2K views</span>
              </div>
              <div className={styles.flexGap2}>
                <Heart size={16} />
                <span>89 likes</span>
              </div>
              <div className={styles.flexGap2}>
                <MessageCircle size={16} />
                <span>23 comments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.spaceY4}>
        <div className={getUIElementClass('dataTable', uiStyle)} style={{ maxWidth: 'none' }}>
          <div className={styles.tableHeader}>
            <h3>Recent Posts</h3>
          </div>
          <div style={{ padding: '16px' }}>
            <div className={styles.spaceY3}>
              {[
                'CSS Grid Mastery Guide',
                'React Hooks Deep Dive', 
                'TypeScript Best Practices',
                'Modern Animation Techniques'
              ].map((title, i) => (
                <div key={i} className={`${styles.textWhite70} ${styles.textSm}`} style={{ cursor: 'pointer' }}>
                  {title}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={getUIElementClass('dataTable', uiStyle)} style={{ maxWidth: 'none' }}>
          <div className={styles.tableHeader}>
            <h3>Tags</h3>
          </div>
          <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['CSS', 'React', 'Design', 'Animation', 'UI/UX', 'JavaScript'].map((tag, i) => (
                <span key={i} style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '12px',
                  padding: '4px 8px',
                  borderRadius: '20px'
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const renderPortfolioContent = (uiStyle: UIElementStyle) => (
  <div className={styles.backgroundContent}>
    <div className={`${styles.grid} ${styles.cols4} ${styles.mb6}`}>
      {[
        { title: 'E-commerce App', tech: 'React • Node.js', color: 'linear-gradient(135deg, #3b82f6, #06b6d4)' },
        { title: 'Portfolio Site', tech: 'Next.js • Tailwind', color: 'linear-gradient(135deg, #8b5cf6, #ec4899)' },
        { title: 'Dashboard UI', tech: 'Vue • TypeScript', color: 'linear-gradient(135deg, #10b981, #14b8a6)' },
        { title: 'Mobile App', tech: 'React Native', color: 'linear-gradient(135deg, #f97316, #dc2626)' }
      ].map((project, i) => (
        <div key={i} className={styles.dataTable} style={{ maxWidth: 'none' }}>
          <div 
            style={{ 
              width: '100%', 
              height: '80px', 
              background: project.color,
              borderRadius: '8px', 
              marginBottom: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
          >
            <Award size={32} style={{ color: 'white' }} />
          </div>
          <h3 className={`${styles.textWhite} ${styles.fontSemibold} ${styles.textSm}`} style={{ marginBottom: '4px' }}>{project.title}</h3>
          <p className={`${styles.textWhite50} ${styles.textXs}`}>{project.tech}</p>
        </div>
      ))}
    </div>
    <div className={`${styles.grid} ${styles.cols2}`}>
      <div className={styles.dataTable} style={{ maxWidth: 'none' }}>
        <div className={styles.tableHeader}>
          <h3>Skills</h3>
        </div>
        <div style={{ padding: '16px' }}>
          <ProgressChart 
            title="" 
            data={[
              { label: 'React/Next.js', value: 95, color: 'linear-gradient(90deg, #61dafb, #0ea5e9)' },
              { label: 'TypeScript', value: 88, color: 'linear-gradient(90deg, #3178c6, #60a5fa)' },
              { label: 'Node.js', value: 82, color: 'linear-gradient(90deg, #339933, #22c55e)' },
              { label: 'Design Systems', value: 90, color: 'linear-gradient(90deg, #8b5cf6, #a78bfa)' }
            ]}
            uiStyle={uiStyle}
          />
        </div>
      </div>
      <div className={styles.dataTable} style={{ maxWidth: 'none' }}>
        <div className={styles.tableHeader}>
          <h3>Experience</h3>
        </div>
        <div style={{ padding: '16px' }}>
          <div className={styles.spaceY3}>
            {[
              { role: 'Senior Frontend Developer', company: 'TechCorp', period: '2022 - Present' },
              { role: 'Full Stack Developer', company: 'StartupXYZ', period: '2020 - 2022' },
              { role: 'UI/UX Designer', company: 'DesignStudio', period: '2019 - 2020' }
            ].map((exp, i) => (
              <div key={i} style={{ borderLeft: '2px solid rgba(255, 255, 255, 0.2)', paddingLeft: '12px' }}>
                <h4 className={`${styles.textWhite} ${styles.fontSemibold} ${styles.textSm}`}>{exp.role}</h4>
                <p className={`${styles.textWhite70} ${styles.textXs}`}>{exp.company}</p>
                <p className={`${styles.textWhite50} ${styles.textXs}`}>{exp.period}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const renderDocsContent = (uiStyle: UIElementStyle) => (
  <div className={styles.backgroundContent}>
    <div className={`${styles.grid} ${styles.cols4}`}>
      <div className={getUIElementClass('dataTable', uiStyle)} style={{ maxWidth: 'none' }}>
        <div className={styles.tableHeader}>
          <h3>Navigation</h3>
        </div>
        <div style={{ padding: '16px' }}>
          <div className={`${styles.spaceY2} ${styles.textSm}`}>
            {[
              'Getting Started',
              'Installation', 
              'Configuration',
              'API Reference',
              'Examples',
              'FAQ',
              'Troubleshooting'
            ].map((item, i) => (
              <div 
                key={i} 
                className={`${styles.textWhite70} ${styles.textSm}`}
                style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  ...(i === 1 ? { background: 'rgba(255, 255, 255, 0.1)', color: 'white' } : {})
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ gridColumn: 'span 3' }} className={getUIElementClass('dataTable', uiStyle)}>
        <div style={{ padding: '24px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h1 className={`${styles.textWhite} ${styles.fontBold}`} style={{ fontSize: '24px', marginBottom: '8px' }}>Installation Guide</h1>
            <p className={`${styles.textWhite70} ${styles.textSm}`}>Quick start guide for setting up the Glass Effect component</p>
          </div>
          
          <div className={styles.spaceY4}>
            <div>
              <h2 className={`${styles.textWhite} ${styles.fontSemibold}`} style={{ fontSize: '18px', marginBottom: '8px' }}>Prerequisites</h2>
              <ul className={`${styles.textWhite70} ${styles.textSm} ${styles.spaceY2}`} style={{ listStyle: 'disc inside' }}>
                <li>Node.js 18+ installed</li>
                <li>React 18+ project setup</li>
                <li>TypeScript configured (recommended)</li>
              </ul>
            </div>
            
            <div>
              <h2 className={`${styles.textWhite} ${styles.fontSemibold}`} style={{ fontSize: '18px', marginBottom: '8px' }}>Installation</h2>
              <div style={{
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
                padding: '12px',
                fontFamily: 'monospace',
                fontSize: '14px',
                color: '#22c55e',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div>npm install react-liquid-glass</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.4)' }}># or</div>
                <div>yarn add react-liquid-glass</div>
              </div>
            </div>
            
            <div>
              <h2 className={`${styles.textWhite} ${styles.fontSemibold}`} style={{ fontSize: '18px', marginBottom: '8px' }}>Basic Usage</h2>
              <div style={{
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
                padding: '12px',
                fontFamily: 'monospace',
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ color: '#60a5fa' }}>import</div>
                <div style={{ marginLeft: '8px' }}>{'{ GlassEffect } from \'react-liquid-glass\';'}</div>
                <div style={{ marginTop: '8px' }}>
                  <div style={{ color: '#a855f7' }}>function</div>
                  <div style={{ marginLeft: '8px', color: '#fbbf24' }}>App() {'{'}</div>
                  <div style={{ marginLeft: '16px', color: '#60a5fa' }}>return</div>
                  <div style={{ marginLeft: '24px' }}>{'<GlassEffect preset="pill">'}</div>
                  <div style={{ marginLeft: '32px', color: 'rgba(255, 255, 255, 0.7)' }}>Hello World</div>
                  <div style={{ marginLeft: '24px' }}>{'</GlassEffect>'}</div>
                  <div style={{ marginLeft: '8px' }}>{'}'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Particle System Component
const ParticleSystem: React.FC<{ type: string; isDark: boolean }> = ({ type, isDark }) => {
  const getParticleElements = () => {
    const particleCount = 12;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(
        <div
          key={i}
          className={`${styles.particle} ${styles[`particle-${type}`]} ${isDark ? styles.particleDark : styles.particleLight}`}
          style={{
            '--delay': `${i * 0.3}s`,
            '--x': `${Math.random() * 100}%`,
            '--y': `${Math.random() * 100}%`,
            '--duration': `${3 + Math.random() * 4}s`
          } as React.CSSProperties}
        />
      );
    }
    
    return particles;
  };

  return (
    <div className={styles.particleContainer}>
      {getParticleElements()}
    </div>
  );
};

interface DynamicBackgroundGlassShowcaseProps {
  children: React.ReactNode;
  backgroundType?: string;
  showDecorations?: boolean;
  contentType?: 'dashboard' | 'social' | 'ecommerce' | 'portfolio' | 'blog' | 'code' | 'docs';
  uiElementStyle?: UIElementStyle;
}

const DynamicBackgroundGlassShowcase: React.FC<DynamicBackgroundGlassShowcaseProps> = ({
  children,
  backgroundType = 'cyberpunk',
  showDecorations = true,
  contentType,
  uiElementStyle
}) => {
  const currentBackground = backgroundPresets.find(bg => bg.name === backgroundType) || backgroundPresets[0];

  // Use override props or fall back to background defaults
  const activeContentType = contentType || currentBackground.content;
  const activeUIStyle = uiElementStyle || currentBackground.uiStyle;

  // Content renderer based on active content type
  const renderBackgroundContent = () => {
    switch (activeContentType) {
      case 'dashboard':
        return renderDashboardContent(activeUIStyle);
      case 'social':
        return renderSocialContent(activeUIStyle);
      case 'ecommerce':
        return renderEcommerceContent(activeUIStyle);
      case 'portfolio':
        return renderPortfolioContent(activeUIStyle);
      case 'blog':
        return renderBlogContent(activeUIStyle);
      case 'code':
        return renderCodeContent(activeUIStyle);
      case 'docs':
        return renderDocsContent(activeUIStyle);
      default:
        return renderDashboardContent(activeUIStyle);
    }
  };

  return (
    <div 
      className={`${styles.showcase} ${styles[currentBackground.gradient]} ${currentBackground.isDark ? styles.darkTheme : styles.lightTheme}`}
      data-theme={currentBackground.isDark ? 'dark' : 'light'}
    >
      {/* Animated gradient background */}
      <div className={styles.gradientBackground}></div>
      
      {/* Particle system */}
      <ParticleSystem type={currentBackground.particles} isDark={currentBackground.isDark} />

      {/* Rich background content */}
      {showDecorations && (
        <div className={currentBackground.isDark ? styles.contentDark : styles.contentLight}>
          {renderBackgroundContent()}
        </div>
      )}

      {/* Background info label */}
      <div className={`${styles.backgroundLabel} ${currentBackground.isDark ? styles.labelDark : styles.labelLight}`}>
        <div className={styles.labelContent}>
          <div className={styles.statusDot}></div>
          <span>{currentBackground.name}</span>
          <span className={styles.separator}>•</span>
          <span className={styles.contentType}>{activeContentType}</span>
          <span className={styles.separator}>•</span>
          <span className={styles.uiStyle}>{activeUIStyle}</span>
        </div>
      </div>

      {/* Glass effect content overlay */}
      <div className={styles.glassContent}>
        {children}
      </div>
    </div>
  );
};

export default DynamicBackgroundGlassShowcase;
export { backgroundPresets };