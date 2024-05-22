FROM nvidia/cuda:12.4.1-devel-ubuntu22.04
ENV CUDA_HOME="/usr/local/cuda"
ENV PATH=$CUDA_HOME/bin:$PATH
ENV LD_LIBRARY_PATH=$CUDA_HOME/lib64:$LD_LIBRARY_PATH
WORKDIR /app

RUN apt-get update && apt-get install -y python3 python3-pip git
RUN pip3 install -r requirements.txt

COPY . .
EXPOSE 3001
CMD ["python", "app.py"]