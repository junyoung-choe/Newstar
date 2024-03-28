import torch
from tqdm import tqdm
from transformers import PreTrainedTokenizerFast, BartForConditionalGeneration

def load_kobart_model_and_tokenizer():
    # KoBART 모델과 토크나이저 로딩
    tokenizer = PreTrainedTokenizerFast.from_pretrained("gogamza/kobart-summarization")
    model = BartForConditionalGeneration.from_pretrained("gogamza/kobart-summarization")
    return model, tokenizer

def summarize_text(text, model, tokenizer):
    # 입력 텍스트를 토크나이즈하여 모델에 입력 가능한 형태로 변환
    raw_input_ids = tokenizer.encode(text)

    # 토크나이저 시작, 끝 처리
    input_ids = [tokenizer.bos_token_id] + raw_input_ids + [tokenizer.eos_token_id]

    if len(input_ids) >= 1023:
        return None

    # 요약 수행
    summary_ids = model.generate(torch.tensor([input_ids]), max_length=256, min_length=64, length_penalty=2.0, num_beams=8, early_stopping=True)

    # 토큰화 디코드 후, 개행문자 제거
    summary_text = tokenizer.decode(summary_ids.squeeze().tolist(), skip_special_tokens=True).replace("\n", "")

    return summary_text

def make_news_summary(news_df):
    # 모델과 토크나이저 로딩
    model, tokenizer = load_kobart_model_and_tokenizer()

    news_df['summary'] = ''

    # 모든 행에 대해 요약 생성
    for i in tqdm(range(len(news_df)), desc="Summarizing"):
        text = summarize_text(news_df.at[i, 'content'], model, tokenizer)
        if text != None:
            news_df.at[i, 'summary'] = text

    # 요약이 없는 행 삭제
    news_df = news_df.dropna(subset = ['summary'])
    news_df = news_df[news_df['summary'] != '']

    return news_df



