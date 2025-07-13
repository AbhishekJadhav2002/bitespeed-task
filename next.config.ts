import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Security Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            value: 'DENY',
            key: 'X-Frame-Options'
          },
          {
            value: 'nosniff',
            key: 'X-Content-Type-Options'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' data: https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' data: https://fonts.googleapis.com https://fonts.gstatic.com; connect-src 'self' https:; frame-ancestors 'none';"
          }
        ]
      }
    ]
  },

  // Image Optimization Security
  images: {
    remotePatterns: [],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },

  turbopack: {
    rules: {
      '*.svg': {
        as: '*.js',
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true
            }
          }
        ]
      }
    }
  },

  // Webpack configuration
  webpack(config, { dev, isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    if (dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            chunks: 'all',
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/
          }
        }
      }
    }

    return config
  },

  // for performance
  experimental: {
    optimizePackageImports: ['@/components', '@/lib']
  },

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
}

export default nextConfig
