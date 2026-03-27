import redis from "../config/cache";

export const rateLimiter = async ({
  key,
  maxRequests,
  windowMs,
}: {
  key: string;
  maxRequests: number;
  windowMs: number;
}) => {
  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, windowMs);
  }
  if (count > maxRequests) {
    throw new Error("Rate limit exceeded");
  }
  return {
    reamaning: Math.max(0, maxRequests - count),
  };
};
