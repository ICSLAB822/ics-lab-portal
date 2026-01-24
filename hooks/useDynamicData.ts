import { useState, useEffect } from 'react';
import { AppData, Lang } from '../types';
import { data as staticData } from '../data';
import { fetchDynamicData, isCMSConfigured, GITHUB_USERNAME, GITHUB_REPO } from '../utils/cms';

// 🔴 重要修改：升级缓存版本号到 v4，应用新的 files/ 路径逻辑
const CACHE_KEY = 'ics_lab_cms_cache_v4'; 
const CACHE_DURATION = 5 * 60 * 1000; 

interface CacheContainer {
    timestamp: number;
    data: Record<Lang, AppData>;
}

export const useDynamicData = () => {
  const [data, setData] = useState<Record<Lang, AppData>>(staticData);
  const [loading, setLoading] = useState(isCMSConfigured); 
  const [isConfigured] = useState(isCMSConfigured); // Expose status

  useEffect(() => {
    // 1. Config Check
    if (!isCMSConfigured) {
        console.log("%c CMS Config Missing ", "background: #f59e0b; color: black; font-weight: bold;", "Please check utils/cms.ts");
        return;
    }

    console.log(`%c CMS Active `, "background: #10b981; color: white; font-weight: bold;", `Fetching data for ${GITHUB_USERNAME}/${GITHUB_REPO}...`);

    let isMounted = true;

    const load = async () => {
      // 2. Cache Check
      // Use "as any" to bypass strict TS check if types aren't perfect in environment
      const isDev = (import.meta as any).env?.DEV;
      const cached = localStorage.getItem(CACHE_KEY);
      
      if (!isDev && cached) {
          try {
              const parsed: CacheContainer = JSON.parse(cached);
              const age = Date.now() - parsed.timestamp;
              if (age < CACHE_DURATION) {
                  console.log(`CMS: Using cached data (${(age/1000).toFixed(1)}s old)`);
                  setData(parsed.data);
                  setLoading(false);
                  return;
              }
          } catch (e) {
              localStorage.removeItem(CACHE_KEY);
          }
      } else if (isDev) {
          console.log("CMS: Dev mode detected - Cache disabled.");
      }

      // 3. Fetch Fresh Data
      try {
        const fetchedData = await fetchDynamicData();
        
        if (isMounted) {
          setData(fetchedData);
          setLoading(false);
          
          if (!isDev) {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                timestamp: Date.now(),
                data: fetchedData
            }));
          }
        }
      } catch (e) {
        console.error("CMS: Failed to load data", e);
        if (isMounted) {
            setLoading(false); 
        }
      }
    };

    load();

    return () => { isMounted = false; };
  }, []);

  return { data, loading, isConfigured };
};