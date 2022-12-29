FROM --platform=linux/amd64 public.ecr.aws/lambda/nodejs:16
# COPY requirements.txt  .
# RUN  pip3 install -r requirements.txt --target "${LAMBDA_TASK_ROOT}"
COPY app.js ${LAMBDA_TASK_ROOT}
CMD [ "app.handler" ]