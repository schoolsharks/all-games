import type { Game } from '../data/games';

// Apps Script configuration
const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL || '';

// JSONP helper function for CORS issues
const fetchWithJSONP = (url: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    
    // Create script element
    const script = document.createElement('script');
    
    // Define callback function
    (window as any)[callbackName] = (data: any) => {
      delete (window as any)[callbackName];
      document.body.removeChild(script);
      resolve(data);
    };
    
    // Handle errors
    script.onerror = () => {
      delete (window as any)[callbackName];
      document.body.removeChild(script);
      reject(new Error('JSONP request failed'));
    };
    
    // Set script source with callback parameter
    script.src = `${url}&callback=${callbackName}`;
    
    // Add script to document
    document.body.appendChild(script);
    
    // Timeout after 10 seconds
    setTimeout(() => {
      if ((window as any)[callbackName]) {
        delete (window as any)[callbackName];
        document.body.removeChild(script);
        reject(new Error('JSONP request timeout'));
      }
    }, 10000);
  });
};

// Fetch games with fallback strategies
export const fetchGamesFromSheets = async (): Promise<Game[]> => {
  if (!APPS_SCRIPT_URL) {
    console.warn('Apps Script URL not configured, using fallback data');
    return getFallbackGames();
  }

  const url = `${APPS_SCRIPT_URL}?action=getGames`;
  
  try {
    // Try regular fetch first
    console.log('Attempting regular fetch from Apps Script:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors', // Explicitly request CORS
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.status !== 'success') {
      throw new Error(data.message || 'Failed to fetch games from Apps Script');
    }
    
    const games = processGamesData(data.data);
    console.log(`Successfully fetched ${games.length} games from Apps Script (regular fetch)`);
    return games;
    
  } catch (fetchError) {
    console.warn('Regular fetch failed, trying JSONP fallback:', fetchError);
    
    try {
      // Fallback to JSONP
      const data = await fetchWithJSONP(url);
      
      if (data.status !== 'success') {
        throw new Error(data.message || 'Failed to fetch games via JSONP');
      }
      
      const games = processGamesData(data.data);
      console.log(`Successfully fetched ${games.length} games from Apps Script (JSONP fallback)`);
      return games;
      
    } catch (jsonpError) {
      console.error('Both fetch methods failed:', { fetchError, jsonpError });
      console.log('Falling back to static data');
      return getFallbackGames();
    }
  }
};

// Process games data from Apps Script response
const processGamesData = (gamesData: any[]): Game[] => {
  if (!Array.isArray(gamesData)) {
    console.warn('Invalid games data format, using fallback');
    return getFallbackGames();
  }
  
  return gamesData
    .filter((gameData: any) => gameData.name?.trim())
    .map((gameData: any): Game => ({
      id: parseInt(gameData.id) || 0,
      name: gameData.name || '',
      playerLink: gameData.playerLink || '',
      adminLink: gameData.adminLink?.trim() || '', // Trim whitespace and handle empty values
      adminPin: gameData.adminPin || '',
      adminPasscode: gameData.adminPasscode || '',
    }));
};

// Fetch specific game by ID
export const fetchGameById = async (gameId: number): Promise<Game | null> => {
  if (!APPS_SCRIPT_URL) {
    return null;
  }

  const url = `${APPS_SCRIPT_URL}?action=getGame&id=${gameId}`;
  
  try {
    // Try regular fetch first
    const response = await fetch(url, { mode: 'cors' });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status === 'success') {
      return processGamesData([data.data])[0] || null;
    }
    
    return null;
    
  } catch (fetchError) {
    try {
      // Fallback to JSONP
      const data = await fetchWithJSONP(url);
      
      if (data.status === 'success') {
        return processGamesData([data.data])[0] || null;
      }
      
      return null;
      
    } catch (jsonpError) {
      console.error('Failed to fetch game by ID:', { fetchError, jsonpError });
      return null;
    }
  }
};

// Test connection with multiple strategies
export const testAppsScriptConnection = async (): Promise<boolean> => {
  if (!APPS_SCRIPT_URL) {
    console.error('Apps Script URL not configured');
    return false;
  }

  const url = `${APPS_SCRIPT_URL}?action=ping`;
  
  try {
    // Try regular fetch
    const response = await fetch(url, { mode: 'cors' });
    const data = await response.json();
    
    if (data.status === 'success') {
      console.log('Apps Script connection successful (regular fetch):', data.message);
      return true;
    }
    
  } catch (fetchError) {
    try {
      // Try JSONP fallback
      const data = await fetchWithJSONP(url);
      
      if (data.status === 'success') {
        console.log('Apps Script connection successful (JSONP):', data.message);
        return true;
      }
      
    } catch (jsonpError) {
      console.error('Apps Script connection failed:', { fetchError, jsonpError });
    }
  }
  
  return false;
};

// Debug function to test Apps Script and get sheet information
export const debugAppsScript = async (): Promise<void> => {
  if (!APPS_SCRIPT_URL) {
    console.error('❌ Apps Script URL not configured');
    return;
  }

  console.log('🔧 Starting Apps Script debug...');
  console.log('📍 Apps Script URL:', APPS_SCRIPT_URL);

  // Test ping
  try {
    console.log('📞 Testing ping...');
    const pingUrl = `${APPS_SCRIPT_URL}?action=ping`;
    const pingResponse = await fetch(pingUrl, { mode: 'cors' });
    const pingData = await pingResponse.json();
    
    if (pingData.status === 'success') {
      console.log('✅ Ping successful:', pingData.message);
    } else {
      console.error('❌ Ping failed:', pingData);
      return;
    }
  } catch (error) {
    console.error('❌ Ping error:', error);
    return;
  }

  // Test getting games with detailed error info
  try {
    console.log('📊 Testing getGames...');
    const gamesUrl = `${APPS_SCRIPT_URL}?action=getGames`;
    const gamesResponse = await fetch(gamesUrl, { mode: 'cors' });
    const gamesData = await gamesResponse.json();
    
    console.log('📋 Full response:', gamesData);
    
    if (gamesData.status === 'success') {
      console.log('✅ Games fetch successful, count:', gamesData.data?.length || 0);
      console.log('🎮 Sample game:', gamesData.data?.[0] || 'No games found');
    } else {
      console.error('❌ Games fetch failed:', gamesData.message);
      console.log('💡 This usually means:');
      console.log('   1. Sheet name doesn\'t match (expected: "Games")');
      console.log('   2. Apps Script not connected to the right sheet');
      console.log('   3. Sheet permissions issue');
    }
  } catch (error) {
    console.error('❌ Games fetch error:', error);
  }

  console.log('🔧 Debug complete. Check the logs above for details.');
};

// Fallback games data
const getFallbackGames = (): Game[] => [
  {
    id: 1,
    name: "miras-homeownership",
    playerLink: "https://miras-homeownership.wgab.world/home",
    adminLink: "https://miras-homeownership.wgab.world/admin",
    adminPin: "1111",
    adminPasscode: "Schoolsharks@2025"
  },
  {
    id: 2,
    name: "skill-quest",
    playerLink: "https://skillquest.wgab.world/",
    adminLink: "https://skillquest.wgab.world/admin",
    adminPin: "1111",
    adminPasscode: "Schoolsharks@2025"
  },
  {
    id: 3,
    name: "sniff-and-tail-server",
    playerLink: "https://sniffandtail.wgab.world",
    adminLink: "", // Example: No admin link
    adminPin: "1111",
    adminPasscode: "Schoolsharks@202"
  },
  {
    id: 4,
    name: "zero-to-hero",
    playerLink: "https://zerotohero.wgab.world/",
    adminLink: "https://zerotohero.wgab.world/admin",
    adminPin: "1111",
    adminPasscode: "Schoolsharks@2025"
  },
  {
    id: 5,
    name: "miras-choices",
    playerLink: "https://miraschoices.wgab.world/",
    adminLink: "https://miraschoices.wgab.world/admin",
    adminPin: "1111",
    adminPasscode: "Schoolsharks@20254"
  },
  {
    id: 6,
    name: "game-of-choises",
    playerLink: "https://gameofchoises.wgab.world/",
    adminLink: "https://gameofchoises.wgab.world/admin",
    adminPin: "1111",
    adminPasscode: "Schoolsharks@2025"
  },
  {
    id: 7,
    name: "data-guard",
    playerLink: "https://dataguard.wgab.world/",
    adminLink: "https://dataguard.wgab.world/admin",
    adminPin: "1111",
    adminPasscode: "Schoolsharks@2025"
  },
  {
    id: 8,
    name: "balance-master",
    playerLink: "https://balancemaster.wgab.world/",
    adminLink: "https://balancemaster.wgab.world/admin",
    adminPin: "1111",
    adminPasscode: "Schoolsharks@2025"
  },
  {
    id: 9,
    name: "aspire-for-her",
    playerLink: "https://sheexports.afh.wgab.world/",
    adminLink: "https://sheexports.afh.wgab.world/admin",
    adminPin: "1111",
    adminPasscode: "Schoolsharks@2025"
  },
  {
    id: 10,
    name: "word-puzzle",
    playerLink: "https://wordpuzzle.wgab.world/",
    adminLink: "", // Example: No admin link
    adminPin: "1111",
    adminPasscode: "Schoolsharks@2025"
  },
  {
    id: 11,
    name: "sherry-chat-game",
    playerLink: "https://chatgame.wgab.world",
    adminLink: "https://chatgame.wgab.world/admin",
    adminPin: "1111",
    adminPasscode: "Schoolsharks@2025"
  },
  {
    id: 12,
    name: "aspire-for-her-staging",
    playerLink: "https://staging-sheexports.afh.wgab.world/",
    adminLink: "https://staging-sheexports.afh.wgab.world/admin",
    adminPin: "1111",
    adminPasscode: "Schoolsharks@2025"
  },
  {
    id: 13,
    name: "mindsmith",
    playerLink: "https://mindsmith.wgab.world/user/onboarding/",
    adminLink: "https://mindsmith.wgab.world/user/onboarding/admin",
    adminPin: "1111",
    adminPasscode: "Schoolsharks@2025"
  },
  {
    id: 14,
    name: "quickk",
    playerLink: "https://staging-quickk.wgab.world/",
    adminLink: "https://staging-quickk.wgab.world/admin",
    adminPin: "1111",
    adminPasscode: "Schoolsharks@2025"
  },
  {
    id: 15,
    name: "upsc-gurus",
    playerLink: "https://app.upscgurus.in",
    adminLink: "https://app.upscgurus.in/admin",
    adminPin: "1111",
    adminPasscode: "Schoolsharks@2025"
  }
];