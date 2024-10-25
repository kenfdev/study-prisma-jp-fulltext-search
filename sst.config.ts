/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "study-prisma-jp-fulltext-search",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
      const vpc = new sst.aws.Vpc('MyVpc', { bastion: true });
      const rds = new sst.aws.Postgres('MyPostgres', { vpc });

      const DATABASE_URL = $interpolate`postgresql://${rds.username}:${rds.password}@${rds.host}:${rds.port}/${rds.database}`;

      new sst.x.DevCommand('Prisma', {
        environment: { DATABASE_URL },
        dev: {
          autostart: false,
          command: 'npx prisma studio',
        },
      });

      const cluster = new sst.aws.Cluster('MyCluster', { vpc });

      cluster.addService('MyService', {
        link: [rds],
        environment: { DATABASE_URL },
        public: {
          ports: [{ listen: '80/http' }],
        },
        dev: {
          command:
            'nodemon --watch "src/**" --ext "ts,json" --ignore "src/**/*.spec.ts" --exec "ts-node src/index.ts"',
        },
      });
  },
});
