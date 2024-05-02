FROM nvidia/cuda:12.4.1-devel-ubuntu22.04
ENV CUDA_HOME="/usr/local/cuda"
ENV PATH=$CUDA_HOME/bin:$PATH
ENV LD_LIBRARY_PATH=$CUDA_HOME/lib64:$LD_LIBRARY_PATH
WORKDIR /app
COPY requirements.txt .
RUN apt-get update && apt-get install -y python3 python3-pip git
RUN pip3 install -U pip && pip3 install -U setuptools
RUN pip3 install "cython<3.0.0" wheel && pip install "PyYAML==5.4.1" --no-build-isolation
RUN pip3 install -r requirements.txt
RUN pip3 install flash-attn==2.5.7
COPY . .
EXPOSE 3001
CMD ["python", "app.py"]