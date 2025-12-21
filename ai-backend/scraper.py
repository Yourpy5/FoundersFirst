from bs4 import BeautifulSoup
import json

with open("/mnt/data/test (1).html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")

schemes = []

cards = soup.select("div.card-box")

for card in cards:
    content = card.find("div", class_="content")

    def get_text(label):
        h = content.find("h4", string=lambda x: x and label in x)
        if not h:
            return ""
        p = h.find_next("p")
        return p.get_text(strip=True) if p else ""

    def get_list(label):
        h = content.find("h4", string=lambda x: x and label in x)
        if not h:
            return ""
        return ", ".join(li.get_text(strip=True) for li in h.find_next("ul").find_all("li"))

    scheme = {
        "scheme_name": card.find("h3").get_text(strip=True),
        "ministry": get_text("Ministry"),
        "department": get_text("Department"),
        "key_sectors": get_list("Key Sector"),
        "brief": get_text("Brief"),
        "eligibility": get_list("Eligibility"),
        "benefits": get_list("Benefits"),
        "benefit_tags": get_list("Benefit Tags"),
        "tenure": get_list("Tenure"),
        "application_link": (
            content.find("a", href=True)["href"]
            if content.find("a", href=True)
            else ""
        )
    }

    schemes.append(scheme)

with open("schemes_structured_documents.json", "w", encoding="utf-8") as f:
    json.dump(schemes, f, indent=4, ensure_ascii=False)

print(f"{len(schemes)} scheme documents created with intact keys")
