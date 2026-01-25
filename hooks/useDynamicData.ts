import { useState, useEffect } from 'react';
import { AppData, Lang } from '../types';
import { fetchDynamicData } from '../utils/cms';

// 缓存配置
const CACHE_KEY = 'ics_lab_cms_cache_v5_local';
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟

interface CacheContainer {
  timestamp: number;
  data: Record<Lang, AppData>;
}

export const useDynamicData = () => {
  const [data, setData] = useState<Record<Lang, AppData> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('%c 本地内容加载 ', 'background: #10b981; color: white; font-weight: bold;', '从 public/content 目录加载...');

    let isMounted = true;

    const load = async () => {
      // 开发模式下禁用缓存
      const isDev = (import.meta as any).env?.DEV;
      const cached = localStorage.getItem(CACHE_KEY);

      if (!isDev && cached) {
        try {
          const parsed: CacheContainer = JSON.parse(cached);
          const age = Date.now() - parsed.timestamp;
          if (age < CACHE_DURATION) {
            console.log(`✅ 使用缓存数据 (${(age / 1000).toFixed(1)}秒前)`);
            setData(parsed.data);
            setLoading(false);
            return;
          }
        } catch (e) {
          localStorage.removeItem(CACHE_KEY);
        }
      } else if (isDev) {
        console.log('🔧 开发模式 - 缓存已禁用');
      }

      // 加载新数据
      try {
        const fetchedData = await fetchDynamicData();

        if (isMounted) {
          setData(fetchedData);
          setLoading(false);

          // 生产模式下缓存数据
          if (!isDev) {
            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({
                timestamp: Date.now(),
                data: fetchedData,
              })
            );
          }
        }
      } catch (e) {
        console.error('❌ 加载内容失败', e);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading };
};
