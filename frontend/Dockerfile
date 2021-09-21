From node:15.13-alpine
WORKDIR /grasp_teaching
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm run build
CMD ["npm","start"]