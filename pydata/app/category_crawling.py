import requests
from bs4 import BeautifulSoup
import pandas
from datetime import datetime
import time
import random

def do_crawling():
  print("start crawling")
  Bcategories = [100, 101, 102, 103, 104, 105]                  # 정치, 경제, 사회, 생활/문화, 세계, IT/과학
  Scategories = [ [265, 266, 267, 268, 269],                    # 국회/정당, 북한, 행정, 국방/외교, 정치일반
                              [259, 260, 262, 263, 310],                    # 금융, 부동산, 글로벌 경제, 경제 일반, 사회 경제
                              [249, 251, 252, 255, 256],                    # 사건사고, 노동, 환경, 식품/의료, 지역
                              [237, 238, 239, 240, 241, 376 ],         # 여행/레저, 음식/맛집, 자동차/시승기, 도로/교통, 건강정보, 패션/뷰티
                              [231, 232, 233, 234, 322],                  # 아시아/호주, 미국/중남미, 유럽, 중동/아프리카, 세계 일반
                              [731, 226, 227, 230, 732, 283, 229, 228] ] #모바일, 인터넷/sns, 통신/뉴미디어, IT일반, 보안/해킹, 컴퓨터, 게임/리뷰, 과학 일반


  resultList = []
  prev_content = None  # 이전 뉴스의 내용을 저장할 변수

  # 현재 시간
  current_hour = datetime.now().hour - 1
  n = 0
  n2 = 0
  for i in range(len(Bcategories)):
    for scategory in Scategories[i]:
      url = f"https://news.naver.com/breakingnews/section/{Bcategories[i]}/{scategory}"

      raw = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
      html = BeautifulSoup(raw.text, "html.parser")

      # 모든 section_article _TEMPLATE 선택
      sections = html.select("div.section_article._TEMPLATE")
      flag = True
      for section in sections:
        articles = section.select("ul.sa_list > li.sa_item")


        # 6개로 이뤄진 list 들의 반복
        for ar in articles:
          n+=1
          print(n)
          title = ar.select_one("a.sa_text_title").text
          title = title.replace("\n", "")
          articleUrl = ar.select_one("a.sa_text_title")["href"]
          # print(ar);


          # 기사 URL로 이동 (list 내부의)
          raw_article = requests.get(articleUrl, headers={'User-Agent': 'Mozilla/5.0'})
          html_article = BeautifulSoup(raw_article.text, "html.parser")

          # 이미지 URL 추출 (못가져 오는 부분으로 if 처리로 특정 업체 날짜 가져오기)
          imageTag = html_article.select_one("img#img1")
          if imageTag and "data-src" in imageTag.attrs:
            imageUrl = imageTag["data-src"]
          elif html_article.select_one("a.sa_text_title"):
            imageUrl = html_article.select_one("a.sa_text_title")["href"]
          else:
            continue



          # 본문 내용 추출
          article_content = html_article.select_one("article#dic_area")
          # 이미지 설명 제거
          for tag in article_content.find_all("em", {"class": "img_desc"}):
            tag.decompose()
          content = article_content.get_text(" ", strip=True) if article_content else None
          # 기사 본문의 글자가 400보다 적으면 넘기기
          if len(content) < 400 or len(content) > 2000:
            continue

          # 작성 날짜 추출
          date_element = html_article.select_one("div.media_end_head_info_datestamp_bunch span.media_end_head_info_datestamp_time")
          date = date_element["data-date-time"] if date_element else None

          # 기사의 시간 파싱
          if date:
            if "AM" in date or "PM" in date:
              temp_time = datetime.strptime(date, "%Y-%m-%d %I:%M:%S %p")
            else:
              temp_time = datetime.strptime(date, "%Y-%m-%d %H:%M:%S")
            article_hour = temp_time.hour
            # print("시각 : " + str(article_hour) )
            # 24시간 형식으로 변환하여 저장
            date = temp_time.strftime("%Y-%m-%d %H:%M:%S")
          else:
            article_hour = None

          # 기사의 내용이 이전에 크롤링한 기사의 내용과 같으면 건너뛰기
          if prev_content and content and prev_content[:10] == content[:10]:
            continue

          # 기사의 시간이 현재 시간보다 이전이면 break
          elif article_hour is not None and article_hour < current_hour:
            flag = False
            break

          # 기사의 시간이 현재 시간 -1 과 같으면 resultList에 추가
          if article_hour is not None and article_hour == current_hour:
            if content and len(content) > 0:
              res = {"title": title, "url": articleUrl,  "date": date, "Bcategory": Bcategories[i], "Scategory": scategory, "image_url": imageUrl, "content": content}
              resultList.append(res)
              prev_content = content  # 기사의 내용을 prev_content에 저장
              n2+=1
              print("실제 저장횟수 : " + str(n2))

          # 랜덤한 시간 동안 대기
          time.sleep(random.uniform(0.1, 1.5))

        # 이중포문 빠져나오기
        if (flag == False):
          break

  df = pandas.DataFrame(resultList)
  df.to_csv('category_articles.csv')
  df.to_excel('category_articles.xlsx')
  print("complete crawling")
  return df