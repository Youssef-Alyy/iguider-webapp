class RateLimiter {
    private limit: number;
    private interval: number;
    private calls: number[];
  
    constructor(limit: number, interval: number) {
      this.limit = limit;
      this.interval = interval;
      this.calls = [];
    }
  
    isAllowed(): boolean {
      const now = Date.now();
      this.calls = this.calls.filter(timestamp => now - timestamp < this.interval);
  
      if (this.calls.length < this.limit) {
        this.calls.push(now);
        return true;
      } else {
        return false;
      }
    }
  }
  
export default RateLimiter;
  